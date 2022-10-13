<template>
  <div class="board">
    <v-data-table
      :headers="headers"
      :items="packages"
      :loading="load"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="rgb(109, 199, 109)"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Create New Package
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-text-field
                    color="rgb(109, 199, 109)"
                    v-model="editedItem.name"
                    label="Name"
                  ></v-text-field>

                  <v-text-field
                    color="rgb(109, 199, 109)"
                    v-model="editedItem.price"
                    label="Price"
                  ></v-text-field>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="rgb(109, 199, 109)" text @click="close">
                  Cancel
                </v-btn>
                <v-btn
                  color="rgb(109, 199, 109)"
                  text
                  @click="save"
                  :loading="load"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this package?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="rgb(109, 199, 109)" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn
                  color="rgb(109, 199, 109)"
                  text
                  @click="deleteItemConfirm"
                  :loading="load"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
          color="rgb(109, 199, 109)"
        >
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)" color="red">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <p>No data to show</p>
      </template>
    </v-data-table>
  </div>
</template>

<script>
//importing axios and adding token to headers
import axios from "axios";
axios.defaults.baseURL = "https://car-wash-backend.herokuapp.com/api";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    action: "add",
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name",
      },

      { text: "Price (FCFA)", value: "price" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    packages: [],
    editedIndex: -1,
    editedItem: {
      name: "",

      price: "",
    },
    defaultItem: {
      name: "",

      price: "",
    },
    load: null,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Package" : "Edit Package";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  beforeMount() {
    this.getPackages();
  },

  methods: {
    // save package
    save() {
      this.load = true;
      // add package
      if (this.action == "add") {
        let payload = this.editedItem; //@click add package
        axios
          .post("/settings/create_package", payload)
          .then(async (res) => {
            if (res.data.success) {
              await this.getPackages();
              this.load = false;
            }
          })
          .catch((err) => {
            this.load = false;
            console.log(err);
            this.msg = "Something went wrong !!";
          });
      }

      //edit package
      if (this.action == "edit") {
        let payload = this.editedItem; //@click edit package
        axios
          .put(`/settings/edit_package/${payload._id}`, payload)
          .then(async (res) => {
            console.log(res.data);
            if (res.data.success) {
              await this.getPackages();
              this.load = false;
            }
          })
          .catch((err) => {
            this.load = false;
            console.log(err);
            this.msg = "Something went wrong !!";
          });
      }
    },

    getPackages() {
      this.load = true;
      axios
        .get("/settings/get_packages")
        .then((res) => {
          this.packages = res.data.reverse();
          this.load = false;
          this.close();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    editItem(item) {
      this.action = "edit"; //@click to edit package
      this.editedIndex = this.packages.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.packages.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.load = true;
      axios
        .delete(`/settings/delete_package/${this.editedItem._id}`)
        .then((res) => {
          if (res.data.success) {
            this.getPackages();
            this.load = false;
            this.closeDelete();
          }
        });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>

<style scoped>
.board {
  width: 100%;
  height: 100%;
  background-color: whitesmoke;
}
.v-data-table {
  margin-bottom: 30px;
}
</style>
