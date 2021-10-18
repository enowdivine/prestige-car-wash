<template>
  <div class="board">
    <v-data-table
      :headers="headers"
      :items="cars"
      sort-by="name"
      :loading="load"
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
                Create New Car
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
                    label="Car"
                  ></v-text-field>

                  <v-text-field
                    color="rgb(109, 199, 109)"
                    v-model="editedItem.rental_price"
                    label="Rental Price"
                  ></v-text-field>

                  <v-text-field
                    color="rgb(109, 199, 109)"
                    v-model="editedItem.repair_price"
                    label="Repair Price"
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
                >Are you sure you want to delete this car?</v-card-title
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
    action: "add", // add functionality for adding cartypes
    headers: [
      {
        text: "Car",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Rental Price (FCFA)", value: "rental_price" },
      { text: "Repair Price (FCFA)", value: "repair_price" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    cars: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      rental_price: 0,
      repair_price: 0,
    },
    defaultItem: {
      name: "",
      rental_price: 0,
      repair_price: 0,
    },
    load: null,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Car" : "Edit Car";
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

  // function to load the records om startup
  beforeMount() {
    this.getcars();
  },

  methods: {
    // save cars
    save() {
      this.load = true;
      if (this.action == "add") {
        let payload = this.editedItem; // @click to add a car
        axios
          .post("/settings/create_car", payload)
          .then(async (res) => {
            if (res.data.success) {
              await this.getcars();
              this.load = false;
            }
          })
          .catch((err) => {
            this.load = false;
            console.log(err);
            this.msg = "Something went wrong !!";
          });
      }

      if (this.action == "edit") {
        let payload = this.editedItem; // @click to add a car
        axios
          .put(`/settings/edit_car/${payload._id}`, payload)
          .then(async (res) => {
            if (res.data.success) {
              await this.getcars();
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

    // getting cars
    getcars() {
      this.laod = true;
      axios
        .get("/settings/get_cars")
        .then((res) => {
          this.cars = res.data.reverse();
          this.load = false;
          this.close();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // delete function to delete a car

    editItem(item) {
      this.action = "edit"; //@click to edit cars
      this.editedIndex = this.cars.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.cars.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.load = true;
      axios
        .delete(`/settings/delete_car/${this.editedItem._id}`)
        .then((res) => {
          if (res.data.success) {
            this.getcars();
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
  padding: 40px;
  background-color: whitesmoke;
}
.v-data-table {
  margin-bottom: 30px;
}
</style>
