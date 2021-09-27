<template>
  <v-data-table
    :headers="headers"
    :items="registeredClients"
    :search="search"
    sort-by="calories"
    class="elevation-1"
    :loading="load"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Registered Clients</v-toolbar-title>

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
                  color="rgb(109, 199, 109)"
                  v-model="editedItem.name"
                  label="Name"
                  required
                ></v-text-field>

                <v-text-field
                  color="rgb(109, 199, 109)"
                  v-model="editedItem.email"
                  label="Email"
                  required
                ></v-text-field>
                <v-select
                  color="rgb(109, 199, 109)"
                  v-model="editedItem.service"
                  :items="serviceString"
                  label="Service"
                  required
                ></v-select>
                <v-text-field
                  color="rgb(109, 199, 109)"
                  v-model="editedItem.cost"
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
      <v-btn
        small
        class="mr-2"
        @click="sendEmail(item)"
        :loading="load"
        rounded
      >
        <v-icon small> mdi-email </v-icon>
      </v-btn>
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
    serviceString: [],
    services: [],
    search: "",
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
      { text: "Service", value: "service" },
      { text: "Category", value: "category" },
      { text: "Amount", value: "cost" },
      { text: "Date", value: "date" },
      { text: "Time", value: "time" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    registeredClients: [],
    editedIndex: -1,
    editedItem: {
      service: "",
      category: "",
      name: "",
      email: "",
      cost: 0,
      time: "",
      date: "",
    },
    defaultItem: {
      service: "",
      category: "",
      name: "",
      email: "",
      cost: 0,
      time: "",
      date: "",
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
    this.getRegisteredClients();
    await axios.get("/settings/get_services").then((res) => {
      this.services = res.data;
    });
    this.services.forEach((service) => {
      this.serviceString.push(service.name);
    });
  },

  methods: {
    getRegisteredClients() {
      this.load = true;
      axios
        .get("/registered/get_activities")
        .then((res) => {
          this.registeredClients = res.data.reverse();
          this.load = false;
          this.close();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    save() {
      this.load = true;
      axios
        .post("/registered/create_activity", this.editedItem)
        .then(async (res) => {
          if (res.data.success) {
            alert("Successful");
            await this.getRegisteredClients();
            this.load = false;
            this.close();
          }
        })
        .catch((err) => {
          this.load = false;
          console.log(err);
          this.msg = "something went wrong";
        });
    },

    sendEmail(item) {
      console.log("send email");
      this.load = true;
      axios
        .post("/registered/email_client", item)
        .then((res) => {
          if (res.data.success) {
            alert("Message sent to client");
            this.load = false;
          }
        })
        .catch((err) => {
          this.load = false;
          alert("Failed");
          this.msg = "Something went wrong";
          console.log(err);
        });
    },

    editItem(item) {
      this.editedIndex = this.registeredClients.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.registeredClients.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.load = true;
      axios
        .delete(`/registered/delete_activity/${this.editedItem._id}`)
        .then((res) => {
          if (res.data.success) {
            this.getRegisteredClients();
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

<style scoped></style>
