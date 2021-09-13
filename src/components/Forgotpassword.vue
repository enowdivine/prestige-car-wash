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
    <v-btn
      color="rgb(109, 199, 109)"
      @click="reset"
      depressed
      dark
      block
      :loading="load"
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
      this.load = true;
      let payload = this.editedItem; //@click reset password
      axios.post("/auth/recoverPasword", payload).then(async (res) => {
        if (res.data.success) {
          this.loader = false;
          this.$emit("reset");
        } else {
          this.load = false;
          this.msg = "Unidentified Email";
        }
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
