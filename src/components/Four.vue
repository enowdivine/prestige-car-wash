<template>
  <v-data-table
    :headers="headers"
    :items="guestclients"
    class="elevation-1"
    items-per-page="7"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <h2>Guest Clients</h2>
        <v-dialog v-show="false" v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this client?</v-card-title
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
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <p>No data to show</p>
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
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Service", value: "service", sortable: false },
      { text: "Amount", value: "cost", sortable: false },
      { text: "Contact", value: "contact", sortable: false },
      { text: "Address", value: "address", sortable: false },
      { text: "Date", value: "date", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
    guestclients: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      service: "",
      cost: "",
      contact: "",
      address: "",
      date: 0,
    },
    defaultItem: {
      name: "",
      service: "",
      cost: "",
      contact: "",
      address: "",
      date: 0,
    },
    load: false,
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
    this.getGuestClients();
  },

  methods: {
    getGuestClients() {
      this.load = true;
      axios
        .get("/guest/get_activities")
        .then((res) => {
          this.guestclients = res.data.reverse();
          this.close();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    editItem(item) {
      this.editedIndex = this.guestclients.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.guestclients.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      axios
        .delete(`/guest/delete_activity/${this.editedItem._id}`)
        .then((res) => {
          if (res.data.success) {
            this.getGuestClients();
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
h2 {
  color: rgb(109, 199, 109);
}
</style>
