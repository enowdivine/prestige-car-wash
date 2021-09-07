<template>
  <span>
    <h2>Forgot Password</h2>
    <v-text-field
      label="Email"
      color="rgb(109, 199, 109)"
      type="email"
      v-model="infoData.email"
      outlined
    ></v-text-field>
    <v-btn color="rgb(109, 199, 109)" @click="reset" depressed dark block
      >Submit</v-btn
    >
    <br />

    <v-btn @click="back" class="mt-3" text color="rgb(109, 199, 109)" depressed
      >Have Account</v-btn
    >
  </span>
</template>

<script>
//importing axios and adding token to headers
import axios from "axios";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");

export default {
  data: () => ({
    infoData: {
      email: "",
    },
    load: null,
  }),
  methods: {
    reset() {
      axios
        .get("/auth/get_admins")
        .then((res) => {
          this.admins = res.data.reverse();
          if (this.infoData.email == this.admins.email) {
            this.emit("reset");
          } else {
            // this.msg = "Email not recognized";
            alert("i do not know you, so get out");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    back() {
      this.$emit("know");
    },
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 10px;
}
</style>
