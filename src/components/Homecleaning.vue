<template>
  <div class="board">
    <v-tabs centered color="rgb(109, 199, 109)">
      <v-tab>Registered Clients</v-tab>
      <v-tab>Guest Clients</v-tab>

      <v-tab-item>
        <v-form>
          <v-text-field
            color="rgb(109, 199, 109)"
            v-model="HomeAndOffice.name"
            outlined
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            color="rgb(109, 199, 109)"
            v-model="HomeAndOffice.email"
            outlined
            label="Email"
            required
          ></v-text-field>
          <v-text-field
            color="rgb(109, 199, 109)"
            v-model="HomeAndOffice.address"
            outlined
            label="Address"
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

      <v-tab-item>
        <v-form>
          <v-text-field
            color="rgb(109, 199, 109)"
            v-model="GuestHome.name"
            outlined
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            color="rgb(109, 199, 109)"
            v-model="GuestHome.contact"
            outlined
            label="Contact"
            required
          ></v-text-field>
          <v-text-field
            color="rgb(109, 199, 109)"
            v-model="GuestHome.address"
            outlined
            label="Address"
            required
          ></v-text-field>
          <v-text-field
            color="rgb(109, 199, 109)"
            v-model="GuestHome.cost"
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
    </v-tabs>
  </div>
</template>

<script>
//importing axios and adding token to headers
import axios from "axios";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");

export default {
  data: () => ({
    HomeAndOffice: {
      name: "",
      email: "",
      address: "",
      cost: "",
    },

    GuestHome: {
      name: "",
      contact: "",
      address: "",
      cost: "",
    },

    load: null,
  }),

  methods: {
    submit() {
      this.load = true;
      let payload = this.HomeAndOffice;
      axios
        .post("/registered/add_home_and_office_cleaning", payload)
        .then((res) => {
          if (res.data.success) {
            this.getRegClients();
            this.load = false;
          } else {
            this.getRegClients();
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

    getRegClients() {
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

    save() {
      this.load = true;
      let payload = this.GuestHome;
      axios
        .post("/guest/add_home_and_office_cleaning", payload)
        .then((res) => {
          if (res.data.success) {
            this.getGuestClients();
            this.load = false;
          } else {
            this.getGuestClients();
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

    getGuestClients() {
      axios
        .get("/guest/get_activities")
        .then((res) => {
          this.guestclients = res.data.reverse();
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
