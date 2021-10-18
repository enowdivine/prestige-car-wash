<template>
  <div class="board">
    <v-data-table
      :headers="headers"
      :items="admins"
      sort-by="name"
      :loading="load"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-text>
                <v-container>
                  <v-text-field
                    v-model="editedItem.name"
                    label="Name"
                  ></v-text-field>

                  <v-text-field
                    v-model="editedItem.contact"
                    label="Phone Number"
                  ></v-text-field>

                  <v-text-field
                    v-model="editedItem.email"
                    label="Email"
                  ></v-text-field>

                  <v-text-field
                    v-model="editedItem.address"
                    label="Address"
                  ></v-text-field>

                  <v-text-field
                    v-model="editedItem.gender"
                    label="Gender"
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
                  load
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this admin?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="rgb(109, 199, 109)"
                  text
                  @click="closeDelete"
                  :loading="load"
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
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");

export default {
  data: () => ({
    action: "add", // add functionality for adding admins
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Phone Number", value: "contact" },
      { text: "Email", value: "email" },
      { text: "Address", value: "address" },
      { text: "Gender", value: "gender" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    admins: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      contact: "",
      email: "",
      address: "",
      gender: "",
    },
    defaultItem: {
      name: "",
      contact: "",
      email: "",
      address: "",
      gender: "",
    },
    load: null,
  }),

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  beforeMount() {
    this.getAdmin();
  },

  methods: {
    // save admin
    save() {
      this.load = true;
      // add admin
      if (this.action == "add") {
        let payload = this.editedItem; //@click add admin
        axios
          .post("/auth/register", payload)
          .then(async (res) => {
            if (res.data.success) {
              await this.getAdmin();
              this.load = false;
            }
          })
          .catch((err) => {
            this.load = false;
            console.log(err);
            this.msg = "Something went wrong !!";
          });
      }

      //edit admin
      if (this.action == "edit") {
        let payload = this.editedItem; //@click edit admin
        axios
          .put(`/auth/edit_profile/${payload._id}`, payload)
          .then(async (res) => {
            console.log(res.data);
            if (res.data.success) {
              await this.getAdmin();
              this.action = "add";
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

    getAdmin() {
      this.load = true;
      axios
        .get("/auth/get_admins")
        .then((res) => {
          this.admins = res.data.reverse();
          this.load = false;
          this.close();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    editItem(item) {
      this.action = "edit"; //@click to edit admins
      this.editedIndex = this.admins.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.admins.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.admins.splice(this.editedIndex, 1);
      this.closeDelete();
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
  padding: 40px;
  background-color: whitesmoke;
}
.v-data-table {
  margin-bottom: 30px;
}
</style>
