<template>
  <v-data-table
    :headers="headers"
    :items="trainees"
    sort-by="name"
    class="elevation-1"
    items-per-page="7"
  >
    <template v-slot:top>
      <v-toolbar flat>
       <h2>Guest Clients</h2>
      <v-dialog v-show="false" v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
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
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
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
        text: "Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Service", value: "service",  sortable: false, },
      { text: "Category", value: "category",  sortable: false, },
      { text: "Amount", value: "amount",  sortable: false, },
      { text: "Contact", value: "contact",  sortable: false, },
      { text: "Address", value: "address",  sortable: false, },
      { text: "Date", value: "date",  sortable: false, },
      { text: "Actions", value: "actions", sortable: false },
    ],
    trainees: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      service: "",
      category: "",
      amount: "",
      contact: "",
      address: "",
      date: 0,
    },
    defaultItem: {
      name: "",
      service: "",
      category: "",
      amount: "",
      contact: "",
      address: "",
      date: 0,
    },
  }),

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
      this.trainees = [
        {
          name: "Express",
          service: "Annually",
          category: "5000",
          amount: "6 months",
          contact: "6 months",
          address: "6 months",
          date: 345678,
        },
        {
           name: "Express",
          service: "Annually",
          category: "5000",
          amount: "6 months",
          contact: "6 months",
          address: "6 months",
          date: 345678,
        },
        {
          name: "Express",
          service: "Annually",
          category: "5000",
          amount: "6 months",
          contact: "6 months",
          address: "6 months",
          date: 345678,
        },
        {
           name: "Express",
          service: "Annually",
          category: "5000",
          amount: "6 months",
          contact: "6 months",
          address: "6 months",
          date: 345678,
        },
      ];
    },

    editItem(item) {
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
      this.trainees.splice(this.editedIndex, 1);
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
        Object.assign(this.trainees[this.editedIndex], this.editedItem);
      } else {
        this.trainees.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style scoped>
  h2{
    color: rgb(109, 199, 109);
  }
</style>
