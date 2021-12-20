<template>
  <v-data-table
    :headers="headers"
    :items="registeredclients"
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
              Register Service
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Register Service (Registered Client)</span>
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
                  v-model="editedItem.email"
                  label="Email"
                ></v-text-field>

                <v-select
                  :items="requiredServices"
                  v-model="editedItem.service"
                  label="Required Service"
                  color="rgb(109, 199, 109)"
                ></v-select>

                <v-select
                  v-if="editedItem.service == 'Rentals'"
                  :items="serviceString"
                  v-model="editedItem.car_type"
                  label="Car Type"
                  color="rgb(109, 199, 109)"
                ></v-select>

                <v-text-field
                  v-if="editedItem.service == 'Rentals'"
                  color="rgb(109, 199, 109)"
                  v-model="editedItem.cost"
                  label="Price"
                  required
                ></v-text-field>

                <v-text-field
                  v-if="editedItem.service == 'Repairs'"
                  color="rgb(109, 199, 109)"
                  v-model="editedItem.car_number"
                  label="Car Number"
                  required
                ></v-text-field>

                <v-text-field
                  v-if="editedItem.service == 'Repairs'"
                  color="rgb(109, 199, 109)"
                  v-model="editedItem.cost"
                  label="Price"
                  required
                ></v-text-field>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="rgb(109, 199, 109)"
                text
                @click="close"
                :loading="load"
              >
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
                  <td class="keys">NAME:</td>
                  <td class="values">{{ editedItem.name }}</td>
                </tr>
                <tr>
                  <td class="keys">SERVICE:</td>
                  <td class="values">{{ editedItem.service }}</td>
                </tr>

                <tr>
                  <td class="keys">CAR NUMBER:</td>
                  <td class="values">{{ editedItem.car_number }}</td>
                </tr>
                <tr>
                  <td class="keys">CAR TYPE:</td>
                  <td class="values">{{ editedItem.car_type }}</td>
                </tr>
                <tr>
                  <td class="keys">DATE:</td>
                  <td class="values">{{ editedItem.date }}</td>
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
      </v-toolbar>
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
    </template>

    <template v-slot:no-data>
      <p>No data to show</p>
    </template>
    <span v-show="false"> {{ chooseService }} </span>
  </v-data-table>
</template>

<script>
//importing axios and adding token to headers
import axios from "axios";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");

export default {
  data: () => ({
    requiredServices: ["Rentals", "Repairs"],
    dialog: false,
    dialogDelete: false,
    printDoc: false,
    output: null,
    action: "add", // add functionality for adding customers
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Service", value: "service", sortable: false },
      { text: "Car Number", value: "car_number", sortable: false },
      { text: "Car Type", value: "car_type", sortable: false },
      { text: "Date", value: "date", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
    registeredclients: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      service: "",
      car_number: "",
      car_type: "",
      date: "",
    },
    defaultItem: {
      name: "",
      service: "",
      car_number: "",
      car_type: "",
      date: "",
    },
    load: null,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Client" : "Edit Client";
    },

    // chooseService() {
    //   this.car_types.forEach((car) => {
    //     if (this.editedItem.car_type == car.name) {
    //       this.editedItem.cost = car.rental_price;
    //     }
    //   });
    //   return true;
    // },
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
    this.getCustomers();
    await axios.get("/settings/get_cars").then((res) => {
      this.car_types = res.data;
    });
    this.car_types.forEach((car_type) => {
      this.serviceString.push(car_type.name);
    });
  },

  methods: {
    // save customer
    save() {
      this.loader = true;
      // add customer
      if (this.action == "add") {
        let payload = this.editedItem; //@click add customer
        axios
          .post("/registered/add_car_rental_and_repair", payload)
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
          .put(`/registered/edit_car_rental_and_repair/${payload._id}`, payload)
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
      this.load = true;
      axios
        .get("/registered/get_car_rental_and_repair")
        .then((res) => {
          this.registeredclients = res.data.reverse();
          this.load = false;
          this.close();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    editItem(item) {
      this.action = "edit"; //@click to edit customer
      this.editedIndex = this.registeredclients.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.registeredclients.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.registeredclients.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    // print receipt
    printReceipt(item) {
      this.editedIndex = this.registeredclients.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.printDoc = true;
    },

    print() {
      // Pass the element id here
      this.$htmlToPaper("printMe");
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

td.values,
th.head {
  padding: 5px;
}

td.keys {
  font-weight: bold;
}
</style>
