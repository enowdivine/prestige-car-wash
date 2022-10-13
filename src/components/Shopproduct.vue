<template>
  <v-data-table
    :headers="headers"
    :items="products"
    :search="search"
    :loading="load"
    sort-by="productName"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Products</v-toolbar-title>

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
              New Product
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
                  v-model="editedItem.productName"
                  label="Product Name"
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
                  v-model="editedItem.unitPrice"
                  label="Unit Price"
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
    <template v-slot:[`item.quantity`]="{ item }">
      <v-chip :color="getColor(item.quantity)" dark>
        {{ item.quantity }}
      </v-chip>
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
      <v-icon small @click="deleteItem(item)" color="red"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <p>No Data To Show</p>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");
export default {
  data: () => ({
    search: "",
    dialog: false,
    dialogDelete: false,
    action: "add",

    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "productName",
      },
      { text: "Quantity", value: "quantity" },
      { text: "Unit Price", value: "unitPrice" },
      { text: "Date", value: "date" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    products: [],
    editedIndex: -1,
    editedItem: {
      productName: "",
      quantity: 0,
      unitPrice: 0,
      date: "",
    },
    defaultItem: {
      productName: "",
      quantity: 0,
      unitPrice: 0,
      date: "",
    },
    load: null,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Product" : "Edit Product";
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
    this.getProducts();
  },

  methods: {
    save() {
      this.load = true;
      // add customer
      if (this.action == "add") {
        let payload = this.editedItem; //@click add customer
        axios
          .post("/shop/register_product", payload)
          .then(async (res) => {
            if (res.data.success) {
              await this.getProducts();
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
        let payload = this.editedItem;
        axios
          .put(`/shop/edit_product/${payload._id}`, payload)
          .then(async (res) => {
            if (res.data.success) {
              alert("successful");
              await this.getProducts();
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

    getProducts() {
      this.load = true;
      axios
        .get("/shop/get_products")
        .then((res) => {
          this.products = res.data.reverse();
          this.load = false;
          this.close();
        })
        .catch((err) => {
          this.load = false;
          console.log(err);
        });
    },

    getColor(quantity) {
      if (quantity < 10) return "red";
      else if (quantity < 20) return "orange";
      else return "green";
    },

    editItem(item) {
      this.action = "edit";
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.load = true;
      axios
        .delete(`/shop/delete_product/${this.editedItem._id}`)
        .then((res) => {
          if (res.data.success) {
            this.getProducts();
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
