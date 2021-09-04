<template>
  <v-data-table :headers="headers" :items="customers" class="elevation-1">
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
                  label="Name"
                ></v-text-field>

                <v-text-field
                  v-model="editedItem.contact"
                  label="Contact"
                ></v-text-field>

                <v-text-field
                  color="rgb(109, 199, 109)"
                  v-model="editedItem.email"
                  label="Email"
                ></v-text-field>

                <v-text-field
                  color="rgb(109, 199, 109)"
                  v-model="editedItem.address"
                  label="Address"
                ></v-text-field>

                <v-text-field
                  color="rgb(109, 199, 109)"
                  v-model="editedItem.gender"
                  label="Gender"
                ></v-text-field>

                <v-text-field
                  color="rgb(109, 199, 109)"
                  v-model="editedItem.package"
                  label="Package"
                ></v-text-field>

                <v-text-field
                  color="rgb(109, 199, 109)"
                  v-model="editedItem.balance"
                  label="Balance"
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
              <v-btn color="rgb(109, 199, 109)" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <p>No data to show !!</p>
    </template>
  </v-data-table>
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
    action: "add", // add functionality for adding customers
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Contact", value: "contact" },
      { text: "Email", value: "email" },
      { text: "Address", value: "address" },
      { text: "Package", value: "package" },
      { text: "Gender", value: "gender" },
      { text: "Balance (FCFA)", value: "balance" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    customers: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      contact: "",
      email: "",
      address: "",
      package: "",
      gender: "",
      balance: 0,
    },
    defaultItem: {
      name: "",
      contact: "",
      email: "",
      address: "",
      package: "",
      gender: "",
      balance: 0,
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
    this.getCustomers();
  },

  methods: {
    // save customer
    save() {
      this.loader = true;
      // add customer
      if (this.action == "add") {
        let payload = this.editedItem; //@click add customer
        axios
          .post("/customer/register_customer", payload)
          .then(async (res) => {
            if (res.data.success) {
              await this.getCustomers();
              this.loader = false;
            }
          })
          .catch((err) => {
            this.loader = false;
            console.log(err);
            this.msg = "Something went wrong !!";
          });
      }

      //edit customer
      if (this.action == "edit") {
        let payload = this.editedItem; //@click edit customer
        axios
          .put(`/customer/edit_customer/${payload._id}`, payload)
          .then(async (res) => {
            console.log(res.data);
            if (res.data.success) {
              await this.getCustomers();
              this.action = "add";
              this.loader = false;
            }
          })
          .catch((err) => {
            this.loader = false;
            console.log(err);
            this.msg = "Something went wrong !!";
          });
      }
    },
    //get customers
    getCustomers() {
      axios
        .get("/customer/get_customers")
        .then((res) => {
          this.customers = res.data.reverse();
          this.close();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    editItem(item) {
      this.action = "edit"; //@click to edit customer
      this.editedIndex = this.customers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    // deleting a service
    deleteItem(item) {
      this.editedIndex = this.customers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      axios
        .delete(`/customer/delete_customer/${this.editedItem._id}`)
        .then((res) => {
          if (res.data.success) {
            this.getCustomers();
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
.v-data-table {
  margin-bottom: 30px;
  margin-left: 30px;
}
</style>
