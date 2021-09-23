<template>
  <div class="board">
    <v-tabs centered color="rgb(109, 199, 109)">
      <v-tab>Registered Clients</v-tab>
      <v-tab>Guest Clients</v-tab>
      <v-tab-item>
        <Cardetailingregistered />
      </v-tab-item>

      <v-tab-item>
        <Cardetailingguest />
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import Cardetailingregistered from "./Cardetailingregistered.vue";
import Cardetailingguest from "./Cardetailingguest.vue";
//importing axios and adding token to headers
import axios from "axios";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");

export default {
  components: {
    Cardetailingregistered,
    Cardetailingguest,
  },
  data: () => ({
    gender: ["Male", "Female"],
    services: [],
    serviceString: [],
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
  computed: {
    chooseService() {
      this.services.forEach((service) => {
        if (this.formInfo.service == service.name) {
          this.formInfo.cost = service.price;
        }
      });
      this.services.forEach((service) => {
        if (this.formData.service == service.name) {
          this.formData.cost = service.price;
        }
      });
      return true;
    },
  },
  async beforeMount() {
    await axios.get("/settings/get_services").then((res) => {
      this.services = res.data;
    });
    this.services.forEach((service) => {
      this.serviceString.push(service.name);
    });
  },
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
          console.log(res.data);
          if (res.data.success) {
            this.getRegisteredClients();
            this.load = false;
          } else {
            this.getRegisteredClients();
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

    getServices() {},
  },
};
</script>

<style scoped>
.board {
  width: 100%;
  height: 100%;
  padding: 40px;
  background-color: whitesmoke;
}
.v-form {
  border-radius: 5px;
  width: 60%;
  margin: 20px auto;
}

.v-btn {
  margin-bottom: 30px;
}
</style>
