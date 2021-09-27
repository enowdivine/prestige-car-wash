<template>
  <div class="board">
    <v-data-table
      :headers="headers"
      :items="guestClients"
      :loading="loader"
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
                Register Client
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
                    outlined
                    label="Name"
                    required
                  ></v-text-field>
                  <v-text-field
                    color="rgb(109, 199, 109)"
                    v-model="editedItem.contact"
                    outlined
                    label="Contact"
                    required
                  ></v-text-field>
                  <v-text-field
                    color="rgb(109, 199, 109)"
                    v-model="editedItem.address"
                    outlined
                    label="Address"
                    required
                  ></v-text-field>
                  <v-text-field
                    color="rgb(109, 199, 109)"
                    v-model="editedItem.cost"
                    outlined
                    label="Amount"
                    required
                  ></v-text-field>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="rgb(109, 199, 109)" text @click="close">
                  Cancel
                </v-btn>
                <v-btn
                  :loading="loader"
                  color="rgb(109, 199, 109)"
                  text
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this customer?</v-card-title
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
                  :loading="loader"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <p>No data to show !!</p>
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
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Email", value: "email" },
      { text: "Address", value: "address" },
      { text: "Date", value: "date" },
      { text: "Time", value: "time" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    guestClients: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      email: "",
      address: "",
      date: "",
      time: "",
    },
    defaultItem: {
      name: "",
      email: "",
      address: "",
      date: "",
      time: "",
    },
    loader: false,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Client" : "Edit Client";
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
    this.getguestClients();
  },

  methods: {
    // save customer
    save() {
      this.loader = true;
      // add customer

      let payload = this.editedItem; //@click add customer
      axios
        .post("/registered/add_home_and_office_cleaning", payload)
        .then(async (res) => {
          if (res.data.success) {
            await this.getguestClients();
            this.loader = false;
          }
        })
        .catch((err) => {
          this.loader = false;
          console.log(err);
          this.msg = "Something went wrong !!";
        });
    },
    //get guestClients
    getguestClients() {
      this.loader = true;
      axios
        .get("/registered/get_activities")
        .then((res) => {
          this.guestClients = res.data.reverse();
          this.loader = false;
          this.close();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    editItem(item) {
      this.editedIndex = this.guestClients.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    // deleting a service
    deleteItem(item) {
      this.editedIndex = this.guestClients.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.loader = true;
      axios
        .delete(`/registered/delete_activity/${this.editedItem._id}`)
        .then((res) => {
          if (res.data.success) {
            this.getguestClients();
            this.loader = false;
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
  margin-left: 30px;
  width: 100%;
  margin: auto;
}
</style>
