<template>
  <v-data-table
    :headers="headers"
    :items="guestClients"
    :search="search"
    sort-by="calories"
    class="elevation-1"
    :loadind="load"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Guest Clients</v-toolbar-title>

        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          color="rgb(109, 199, 109)"
        ></v-text-field>
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
              New Cient
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-text-field
                  v-model="editedItem.carNumber"
                  label="Car Number"
                  color="rgb(109, 199, 109)"
                ></v-text-field>

                <v-text-field
                  v-model="editedItem.carType"
                  label="Car Type"
                  color="rgb(109, 199, 109)"
                ></v-text-field>

                <v-text-field
                  v-model="editedItem.color"
                  color="rgb(109, 199, 109)"
                  label="Color"
                ></v-text-field>

                <v-select
                  v-model="editedItem.service"
                  :items="serviceString"
                  color="rgb(109, 199, 109)"
                  label="Service"
                ></v-select>

                <v-text-field
                  v-model="editedItem.remark"
                  color="rgb(109, 199, 109)"
                  label="Remark"
                ></v-text-field>

                <v-text-field
                  v-model="editedItem.cost"
                  color="rgb(109, 199, 109)"
                  label="Amount"
                ></v-text-field>

                <v-text-field
                  v-model="editedItem.name"
                  color="rgb(109, 199, 109)"
                  label="Name"
                ></v-text-field>

                <v-text-field
                  v-model="editedItem.contact"
                  color="rgb(109, 199, 109)"
                  label="Contact"
                ></v-text-field>

                <v-text-field
                  v-model="editedItem.email"
                  color="rgb(109, 199, 109)"
                  label="Email"
                ></v-text-field>

                <v-text-field
                  v-model="editedItem.address"
                  color="rgb(109, 199, 109)"
                  label="Address"
                ></v-text-field>

                <v-select
                  :items="gender"
                  v-model="editedItem.gender"
                  color="rgb(109, 199, 109)"
                  label="Gender"
                ></v-select>

                <v-text-field
                  v-model="editedItem.dateOfBirth"
                  color="rgb(109, 199, 109)"
                  label="Date of birth"
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
                :loading="load"
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
              >Are you sure you want to delete this Client?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="rgb(109, 199, 109)" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn
                color="rgb(109, 199, 109)"
                text
                :loading="load"
                @click="deleteItemConfirm"
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
      <p>No Data To Show</p>
    </template>
    <span v-show="false">{{ chooseService }}</span>
  </v-data-table>
</template>

<script>
import axios from "axios";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");
export default {
  data: () => ({
    gender: ["Male", "Female"],
    serviceString: [],
    services: [],
    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Car Number",
        align: "start",
        sortable: false,
        value: "carNumber",
      },
      { text: "Car Type", value: "carType" },
      { text: "Color", value: "color" },
      { text: "Service", value: "service" },
      { text: "Remark", value: "remark" },
      { text: "Amount", value: "cost" },
      { text: "Count", value: "count" },
      { text: "Date", value: "date" },
      { text: "Time", value: "time" },
      { text: "Name", value: "name" },
      { text: "Contact", value: "contact" },
      { text: "Email", value: "email" },
      { text: "Address", value: "address" },
      { text: "Gender", value: "gender" },
      { text: "Birth Date", value: "dateOfBirth" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    guestClients: [],
    editedIndex: -1,
    editedItem: {
      carType: "",
      carNumber: "",
      color: "",
      service: "",
      remark: "",
      name: "",
      email: "",
      contact: "",
      address: "",
      dateOfBirth: "",
      cost: 0,
      time: "",
      date: "",
      gender: "",
      count: 0,
    },
    defaultItem: {
      carType: "",
      carNumber: "",
      color: "",
      service: "",
      remark: "",
      name: "",
      email: "",
      contact: "",
      address: "",
      dateOfBirth: "",
      cost: 0,
      time: "",
      date: "",
      gender: "",
      count: 0,
    },
    load: null,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Client" : "Edit Client";
    },

    chooseService() {
      this.services.forEach((service) => {
        if (this.editedItem.service == service.name) {
          this.editedItem.cost = service.price;
        }
      });
      return true;
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

  async beforeMount() {
    this.getGuestClients();
    await axios.get("/settings/get_services").then((res) => {
      this.services = res.data;
    });
    this.services.forEach((service) => {
      this.serviceString.push(service.name);
    });
  },

  methods: {
    save() {
      this.load = true;
      axios
        .post("/guest/create_activity", this.editedItem)
        .then(async (res) => {
          if (res.data.success) {
            alert("Successful");
            await this.getGuestClients();
            this.load = false;
          }
        })
        .catch((err) => {
          this.load = false;
          console.log(err);
          this.msg = "something went wrong";
        });
    },

    getGuestClients() {
      this.load = true;
      axios
        .get("/guest/get_activities")
        .then((res) => {
          this.guestClients = res.data.reverse();
          this.load = false;
          this.close();
        })
        .catch((err) => {
          this.load = false;
          console.log(err);
        });
    },

    deleteItem(item) {
      this.editedIndex = this.guestClients.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.load = true;
      axios
        .delete(`/guest/delete_activity/${this.editedItem._id}`)
        .then((res) => {
          if (res.data.success) {
            this.getGuestClients();
            this.load = false;
            this.closeDelete();
          }
        })
        .catch((err) => {
          console.log(err);
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
