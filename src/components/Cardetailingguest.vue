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

        <v-dialog v-model="printDoc" max-width="500px">
          <v-card id="printMe">
            <h3>PRESTIGE CAR WASH</h3>
            <table>
              <thead>
                <tr>
                  <th class="head">CASH RECEIPT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="keys">CAR TYPE:</td>
                  <td class="values">{{ editedItem.carType }}</td>
                </tr>
                <tr>
                  <td class="keys">CAR NUMBER:</td>
                  <td class="values">{{ editedItem.carNumber }}</td>
                </tr>
                <tr>
                  <td class="keys">COLOR:</td>
                  <td class="values">{{ editedItem.color }}</td>
                </tr>
                <tr>
                  <td class="keys">SERVICE:</td>
                  <td class="values">{{ editedItem.service }}</td>
                </tr>
                <tr>
                  <td class="keys">REMARK:</td>
                  <td class="values">{{ editedItem.remark }}</td>
                </tr>
                <tr>
                  <td class="keys">NAME:</td>
                  <td class="values">{{ editedItem.name }}</td>
                </tr>
                <tr>
                  <td class="keys">EMAIL:</td>
                  <td class="values">{{ editedItem.email }}</td>
                </tr>
                <tr>
                  <td class="keys">CONTACT:</td>
                  <td class="values">{{ editedItem.contact }}</td>
                </tr>
                <tr>
                  <td class="keys">ADDRESS:</td>
                  <td class="values">{{ editedItem.address }}</td>
                </tr>
                <tr>
                  <td class="keys">BIRTH DATE:</td>
                  <td class="values">{{ editedItem.dateOfBirth }}</td>
                </tr>
                <tr>
                  <td class="keys">COST:</td>
                  <td class="values">{{ editedItem.cost }}</td>
                </tr>
                <tr>
                  <td class="keys">TIME:</td>
                  <td class="values">{{ editedItem.time }}</td>
                </tr>
                <tr>
                  <td class="keys">DATE:</td>
                  <td class="values">{{ editedItem.date }}</td>
                </tr>
                <tr>
                  <td class="keys">GENDER:</td>
                  <td class="values">{{ editedItem.gender }}</td>
                </tr>
                <tr>
                  <td class="keys">COUNT:</td>
                  <td class="values">{{ editedItem.count }}</td>
                </tr>
              </tbody>
            </table>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="rgb(109, 199, 109)"
                text
                @click="print"
                :loading="loader"
                >PRINT</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogMsg" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Send Message To Client</v-card-title>
            <v-form>
              <v-container>
                <v-textarea
                  class="message"
                  outlined
                  v-model="BMessage"
                  placeholder="Enter Message"
                ></v-textarea>
              </v-container>
            </v-form>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="rgb(109, 199, 109)" text @click="closedialogMsg"
                >Cancel</v-btn
              >
              <v-btn
                color="rgb(109, 199, 109)"
                text
                :loading="load"
                @click="sendMsg"
                >Send</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:[`item.count`]="{ item }">
      <v-chip :color="getColor(item.count)" dark>
        {{ item.count }}
      </v-chip>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="printReceipt(item)"
        color="rgb(109, 199, 109)"
      >
        mdi-printer
      </v-icon>
      <v-icon small @click="openMsg(item)" color="rgb(109, 199, 109)">
        mdi-email
      </v-icon>
      <v-icon small @click="deleteItem(item)" color="red"> mdi-delete </v-icon>
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
    dialogMsg: false,
    BMessage: "",
    dialog: false,
    dialogDelete: false,
    printDoc: false,
    output: null,
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
      { text: "Payment Method", value: "remark" },
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
      [...this.services].forEach((service) => {
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
    [...this.services].forEach((service) => {
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

    // print receipt
    printReceipt(item) {
      this.editedIndex = this.guestClients.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.printDoc = true;
    },

    print() {
      // Pass the element id here
      this.$htmlToPaper("printMe");
    },

    openMsg(item) {
      this.editedIndex = this.guestClients.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogMsg = true;
    },

    closedialogMsg() {
      this.dialogMsg = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    sendMsg() {
      this.load = true;
      axios
        .post(`/guest/email_client/${this.editedItem._id}`, this.BMessage)
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            alert("Message sent succesfully");
            this.load = false;
          }
        })
        .catch((err) => {
          this.load = false;
          alert("Something went wrong");
          console.log(err);
        });
    },

    getColor(count) {
      if (count < 10) return "red";
      else return "green";
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
.message {
  padding: 20px;
}
#printMe {
  padding: 30px;
}
td,
th,
tr,
table {
  text-align: left;
  border-top: 1px solid black;
  border-collapse: collapse;
}

table{
  width: 100%;
  margin-top: 20px;
}

td.values,
th.head {
  padding: 5px;
}

td.keys {
  font-weight: bold;
}
</style>
