<template>
  <div class="board">
    <v-data-table
      :headers="headers"
      :items="trainees"
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
                Register New Trainee
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-text-field
                    v-model="editedItem.name"
                    label="Name"
                  ></v-text-field>

                  <v-text-field
                    v-model="editedItem.contact"
                    label="Contact"
                  ></v-text-field>

                  <v-text-field
                    v-model="editedItem.address"
                    label="Address"
                  ></v-text-field>

                  <v-text-field
                    v-model="editedItem.gender"
                    label="Gender"
                  ></v-text-field>

                  <v-text-field
                    v-model="editedItem.date"
                    label="Date"
                  ></v-text-field>

                  <v-text-field
                    v-model="editedItem.period"
                    label="Training Period"
                  ></v-text-field>

                  <v-text-field
                    v-model="editedItem.amount"
                    label="Amount"
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
                >Are you sure you want to delete this student?</v-card-title
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
                    <td class="keys">CONTACT:</td>
                    <td class="values">{{ editedItem.contact }}</td>
                  </tr>
                  <tr>
                    <td class="keys">ADDRESS:</td>
                    <td class="values">{{ editedItem.address }}</td>
                  </tr>
                  <tr>
                    <td class="keys">GENDER:</td>
                    <td class="values">{{ editedItem.gender }}</td>
                  </tr>
                  <tr>
                    <td class="keys">DATE:</td>
                    <td class="values">{{ editedItem.date }}</td>
                  </tr>
                  <tr>
                    <td class="keys">PERIOD:</td>
                    <td class="values">{{ editedItem.period }}</td>
                  </tr>
                  <tr>
                    <td class="keys">AMOUNT:</td>
                    <td class="values">{{ editedItem.amount }}</td>
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
    printDoc: false,
    output: null,
    action: "add",
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Contact", value: "contact" },
      { text: "Address", value: "address" },
      { text: "Gender", value: "gender" },
      { text: "Date", value: "date" },
      { text: "Training Period", value: "period" },
      { text: "Amount (FCFA)", value: "amount" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    trainees: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      contact: "",
      address: "",
      gender: "",
      date: "",
      period: "",
      amount: 0,
    },
    defaultItem: {
      name: "",
      contact: "",
      address: "",
      gender: "",
      date: "",
      period: "",
      amount: 0,
    },
    load: null,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Trainee" : "Edit Trainee";
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
    this.getTrainees();
  },

  methods: {
    // save trainee
    save() {
      this.load = true;
      // add trainee
      if (this.action == "add") {
        let payload = this.editedItem; //@click add trainee
        axios
          .post("/training/register_trainee", payload)
          .then(async (res) => {
            if (res.data.success) {
              await this.getTrainees();
              this.load = false;
            }
          })
          .catch((err) => {
            this.load = false;
            console.log(err);
            this.msg = "Something went wrong !!";
          });
      }

      //edit trainee
      if (this.action == "edit") {
        let payload = this.editedItem; //@click edit trainee
        axios
          .put(`/training/edit_trainee/${payload._id}`, payload)
          .then(async (res) => {
            console.log(res.data);
            if (res.data.success) {
              await this.getTrainees();
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

    getTrainees() {
      this.load = true;
      axios
        .get("/training/get_trainees")
        .then((res) => {
          this.trainees = res.data.reverse();
          this.load = false;
          this.close();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    editItem(item) {
      this.action = "edit"; //@click to edit trainee
      this.editedIndex = this.trainees.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.trainees.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.load = true;
      axios
        .delete(`/training/delete_trainee/${this.editedItem._id}`)
        .then((res) => {
          if (res.data.success) {
            this.getTrainees();
            this.load = false;
            this.closeDelete();
          }
        });
    },

    // print receipt
    printReceipt(item) {
      this.editedIndex = this.trainees.indexOf(item);
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
.board {
  width: 100%;
  height: 100%;
  padding-top: 20px;
  background-color: whitesmoke;
}
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
