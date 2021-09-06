<template>
  <v-tabs centered color="rgb(109, 199, 109)">
    <v-tab>Registered Clients</v-tab>
    <v-tab>Guest Clients</v-tab>

    <v-tab-item>
      <v-form>
        <v-text-field
          color="rgb(109, 199, 109)"
          v-model="regclients.name"
          outlined
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          color="rgb(109, 199, 109)"
          v-model="regclients.email"
          outlined
          label="Email"
          required
        ></v-text-field>

        <v-btn
          block
          color="rgb(109, 199, 109)"
          dark
          @click="submit"
          :loading="load"
          >Submit</v-btn
        >
      </v-form>
    </v-tab-item>

    <v-tab-item
      ><v-form>
        <v-text-field
          color="rgb(109, 199, 109)"
          v-model="guestclients.name"
          outlined
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          color="rgb(109, 199, 109)"
          v-model="guestclients.contact"
          outlined
          label="Contact"
          required
        ></v-text-field>
        <v-text-field
          color="rgb(109, 199, 109)"
          v-model="guestclients.address"
          outlined
          label="Address"
          required
        ></v-text-field>

        <v-btn
          block
          color="rgb(109, 199, 109)"
          dark
          @click="save"
          :loading="load"
          >Submit</v-btn
        >
      </v-form></v-tab-item
    >
  </v-tabs>
</template>

<script>
//importing axios and adding token to headers
import axios from "axios";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");

export default {
  data: () => ({
    regclients: {
      name: "",
      email: "",
    },
    guestclients: {
      name: "",
      contact: "",
      address: "",
    },

    load: null,
  }),

  methods: {
    submit() {
      this.load = true;
      let payload = this.regclients;
      axios
        .post("/registered/add_household_item_clean", payload)
        .then((res) => {
          if (res.data.success) {
            this.registeredClients();
            this.load = false;
          } else {
            this.registeredClients();
            this.load = false;
            alert(res.data.msg);
          }
        })
        .catch((err) => {
          this.load = false;
          console.log(err);
          this.msg = "Something went wrong !!";
        });
    },

    registeredClients() {
      this.load = true;
      axios
        .get("/registered/get_activities")
        .then((res) => {
          this.regclients = res.data.reverse();
          this.close();
        })
        .catch((err) => {
          this.load = false;
          console.log(err);
          this.msg = "Something went wrong !!";
        });
    },

    save() {
      this.load = true;
      let payload = this.guestclients;
      axios
        .post("/guest/add_household_item_clean", payload)
        .then((res) => {
          if (res.data.success) {
            this.guestClients();
            this.load = false;
          } else {
            this.guestClients();
            this.load = false;
            alert(res.data.msg);
          }
        })
        .catch((err) => {
          this.load = false;
          console.log(err);
          this.msg = "Something went wrong !!";
        });
    },

    guestClients() {
      this.load = true;
      axios
        .get("/guest/get_activities")
        .then((res) => {
          this.guestclients = res.data.reverse();
          this.close();
        })
        .catch((err) => {
          this.load = false;
          console.log(err);
          this.msg = "Something went wrong !!";
        });
    },
  },
};
</script>

<style scoped>
.v-form {
  border-radius: 5px;
  width: 60%;
  margin: 20px auto;
}

.v-btn {
  margin-bottom: 30px;
}
</style>
