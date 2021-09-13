<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :search="search"
    sort-by="calories"
    class="elevation-1"
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
                  v-model="editedItem.car_number"
                  label="Car number"
                  required
                ></v-text-field>
                <v-text-field
                  color="rgb(109, 199, 109)"
                  v-model="editedItem.car_type"
                  label="Car Type"
                  required
                ></v-text-field>
                <v-text-field
                  color="rgb(109, 199, 109)"
                  v-model="editedItem.color"
                  label="Color"
                  required
                ></v-text-field>
                <v-select
                  :items="serviceString"
                  v-model="editedItem.service"
                  label="Required Service"
                  color="rgb(109, 199, 109)"
                ></v-select>

                <v-text-field
                  color="rgb(109, 199, 109)"
                  v-model="editedItem.remark"
                  label="Remark"
                  required
                ></v-text-field>

                <v-text-field
                  color="rgb(109, 199, 109)"
                  v-model="editedItem.cost"
                  label="Amount"
                  required
                ></v-text-field>
                <v-text-field
                  color="rgb(109, 199, 109)"
                  v-model="editedItem.count"
                  label="Count"
                  required
                ></v-text-field>
                <v-text-field
                  color="rgb(109, 199, 109)"
                  v-model="editedItem.date"
                  label="Date"
                  required
                ></v-text-field>
                <v-text-field
                  color="rgb(109, 199, 109)"
                  v-model="editedItem.time"
                  label="Time"
                  required
                ></v-text-field>
                <v-text-field
                  color="rgb(109, 199, 109)"
                  v-model="editedItem.name"
                  label="Name"
                  required
                ></v-text-field>
                <v-text-field
                  color="rgb(109, 199, 109)"
                  v-model="editedItem.contact"
                  label="Contact"
                  required
                ></v-text-field>
                <v-text-field
                  color="rgb(109, 199, 109)"
                  v-model="editedItem.email"
                  label="Email"
                  required
                ></v-text-field>
                <v-text-field
                  color="rgb(109, 199, 109)"
                  v-model="editedItem.address"
                  label="Address"
                  required
                ></v-text-field>
                <v-text-field
                  color="rgb(109, 199, 109)"
                  v-model="editedItem.gender"
                  label="Gender"
                  required
                ></v-text-field>
                <v-text-field
                  color="rgb(109, 199, 109)"
                  v-model="editedItem.birth_date"
                  label="Birth Date"
                  required
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
              >Are you sure you want to delete this Client?</v-card-title
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
      <p>No Data To Show</p>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    search: "",
    dialog: false,
    dialogDelete: false,

    headers: [
      {
        text: "Car Number",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Car Type", value: "calories" },
      { text: "Color", value: "fat" },
      { text: "Service", value: "carbs" },
      { text: "Remark", value: "protein" },
      { text: "Amount", value: "protein" },
      { text: "Count", value: "protein" },
      { text: "Date", value: "protein" },
      { text: "Time", value: "protein" },
      { text: "Name", value: "protein" },
      { text: "Contact", value: "protein" },
      { text: "Email", value: "protein" },
      { text: "Address", value: "protein" },
      { text: "Gender", value: "protein" },
      { text: "Birth Date", value: "protein" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
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

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
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
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style scoped>
.one {
  background-color: red;
}
</style>
