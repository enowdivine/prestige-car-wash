<template>
  <v-data-table
    :headers="headers"
    :items="customers"
    sort-by="name"
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
              Create New Car
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
                  v-model="editedItem.car"
                  label="Car"
                ></v-text-field>

                <v-text-field
                  color="rgb(109, 199, 109)"
                  v-model="editedItem.rentalPrice"
                  label="Rental Price"
                ></v-text-field>

                <v-text-field
                  color="rgb(109, 199, 109)"
                  v-model="editedItem.repairPrice"
                  label="Repair Price"
                ></v-text-field>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="rgb(109, 199, 109)" text @click="close">
                Cancel
              </v-btn>
              <v-btn color="rgb(109, 199, 109)" text @click="save">
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
              <v-btn
                color="rgb(109, 199, 109)"
                text
                @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn
                color="rgb(109, 199, 109)"
                text
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
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="rgb(109, 199, 109)" @click="initialize">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Car",
        align: "start",
        sortable: false,
        value: "car",
      },
      { text: "Rental Price (FCFA)", value: "rentalPrice" },
      { text: "Repair Price (FCFA)", value: "repairPrice" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    customers: [],
    editedIndex: -1,
    editedItem: {
      car: "",
      rentalPrice: "",
      repairPrice:"",
    },
    defaultItem: {
      car: "",
      rentalPrice: "",
      repairPrice:"",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Car" : "Edit Car";
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

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.customers = [
        {
          car: "Express",
          rentalPrice: "45678",
          repairPrice: "45678",
        },
        {
          car: "Express",
          rentalPrice: "45678",
          repairPrice: "45678",
        },
        {
          car: "Express",
          rentalPrice: "45678",
          repairPrice: "45678",
        },
        {
          car: "Express",
          rentalPrice: "45678",
          repairPrice: "45678",
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.customers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.customers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.customers.splice(this.editedIndex, 1);
      this.closeDelete();
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

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.customers[this.editedIndex], this.editedItem);
      } else {
        this.customers.push(this.editedItem);
      }
      this.close();
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
