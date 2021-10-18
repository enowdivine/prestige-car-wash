<template>
  <v-data-table
    :headers="headers"
    :items="sales"
    :search="search"
    sort-by="calories"
    class="elevation-1"
    :loading="load"
    color="rgb(109, 199, 109)"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Sales</v-toolbar-title>

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
              New Sale
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-select
                  v-model="editedItem.productName"
                  :items="prod"
                  label="Name"
                  color="rgb(109, 199, 109)"
                ></v-select>
                <v-text-field
                  color="rgb(109, 199, 109)"
                  v-model="editedItem.amount"
                  label="Price"
                  required
                ></v-text-field>
                <v-text-field
                  color="rgb(109, 199, 109)"
                  v-model="editedItem.quantity"
                  label="Quantity"
                  required
                ></v-text-field>

                <v-text-field
                  color="rgb(109, 199, 109)"
                  v-model="editedItem.remark"
                  label="Remark"
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
              >Are you sure you want to delete this item?</v-card-title
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
      <v-icon small @click="deleteItem(item)" color="red"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <p>No Data To Show</p>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    search: "",
    dialog: false,
    dialogDelete: false,
    products: [],
    prod: [],

    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "productName",
      },
      { text: "Quantity", value: "quantity" },
      { text: "Price", value: "amount" },
      { text: "Remark", value: "remark" },
      { text: "Date", value: "date" },
      { text: "Time", value: "time" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    sales: [],
    editedIndex: -1,
    editedItem: {
      productName: "",
      quantity: "",
      amount: "",
      remark: "",
      date: "",
      time: "",
    },
    defaultItem: {
      productName: "",
      quantity: "",
      amount: "",
      remark: "",
      date: "",
      time: "",
    },
    load: null,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Sale" : "Edit Sale";
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
    this.getSales();
    await axios.get("shop/get_products").then((res) => {
      this.products = res.data;
    });
    this.products.forEach((product) => {
      this.prod.push(product.productName);
    });
  },

  methods: {
    save() {
      this.load = true;
      axios
        .post("/shop/sell", this.editedItem)
        .then(async (res) => {
          if (res.data.success) {
            await this.getSales();
            this.load = false;
          }
        })
        .catch((err) => {
          this.load = false;
          console.log(err);
          this.msg = "something went wrong!!!";
        });
    },
    getSales() {
      this.load = true;
      axios
        .get("shop/get_sales")
        .then((res) => {
          this.sales = res.data.reverse();
          this.load = false;
          this.close();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    editItem(item) {
      this.editedIndex = this.sales.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.sales.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.load = true;
      axios
        .delete(`/shop/delete_sale/${this.editedItem._id}`)
        .then((res) => {
          if (res.data.success) {
            this.getSales();
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
