<template>
  <v-tabs centered color="rgb(109, 199, 109)">
    <v-tab>Registered Clients</v-tab>
    <v-tab>Guest Clients</v-tab>
    <v-tab-item>
      <v-form>
        <v-text-field
          color="rgb(109, 199, 109)"
          v-model="formInfo.name"
          outlined
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          color="rgb(109, 199, 109)"
          v-model="formInfo.email"
          outlined
          label="Email"
          required
        ></v-text-field>

        <v-select
          :items="services"
          v-model="formInfo.service"
          label="Required Service"
          outlined
          color="rgb(109, 199, 109)"
        ></v-select>

        <v-text-field
          color="rgb(109, 199, 109)"
          v-model="formInfo.cost"
          outlined
          label="Amount"
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
      </v-form>
    </v-tab-item>

    <v-tab-item>
      <v-form>
        <v-text-field
          color="rgb(109, 199, 109)"
          v-model="formData.name"
          outlined
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          color="rgb(109, 199, 109)"
          v-model="formData.contact"
          outlined
          label="Contact"
          required
        ></v-text-field>
        <v-text-field
          color="rgb(109, 199, 109)"
          v-model="formData.address"
          outlined
          label="Adress"
          required
        ></v-text-field>
        <v-select
          :items="services"
          v-model="formData.service"
          label="Required Service"
          outlined
          color="rgb(109, 199, 109)"
        ></v-select>
        <v-text-field
          color="rgb(109, 199, 109)"
          v-model="formData.cost"
          outlined
          label="Amount"
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
  </v-tabs>
</template>

<script>
//importing axios and adding token to headers
import axios from "axios";
axios.defaults.baseURL = "https://car-wash-backend.herokuapp.com/api";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");

export default {
  data: () => ({
    services: [
      "Classic wash",
      "Engine Detailing",
      "Headlights Restoration",
      "Air Vents Stream Cleaning",
      "Carpet Detailing",
      "Chair Detailing",
      "Safety Belt Cleaning",
      "Radiator Flushing",
      "Chassis/Undercarriage Pressure Cleaning",
      "Tyre and Wheel Drum Shinning",
      "Car Polishing, Waxing and Stain Renoval",
      "Fill Detailing",
    ],
    gender: ["Male", "Female"],
    cars: ["Mercedes", "Infinity"],

    formData: {
      name: "",
      contact: "",
      service: "",
      address: "",
      cost: "",
    },
    formInfo: {
      name: "",
      email: "",
      service: "",
      cost: "",
    },

    load: null,
  }),

  methods: {
    submit() {
      this.load = true;

      let payload = this.formData;
      axios
        .post("/guest/create_activity", payload)
        .then((res) => {
          if (res.data.success) {
            this.getGuestClients();
            this.load = false;
          }
        })
        .catch((err) => {
          this.load = false;
          console.log(err);
          this.msg = "Something went wrong !!";
        });
    },

    getGuestClients() {
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

    save() {
      this.load = true;

      let payload = this.formInfo;
      axios
        .post("/registered/create_activity", payload)
        .then((res) => {
          if (res.data.success) {
            this.getRegisteredClients();
            this.load = false;
          }
        })
        .catch((err) => {
          this.load = false;
          console.log(err);
          this.msg = "Something went wrong !!";
        });
    },

    getRegisteredClients() {
      axios
        .get("/registered/get_activities")
        .then((res) => {
          this.registeredclients = res.data.reverse();
          this.close();
        })
        .catch((err) => {
          console.log(err);
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
