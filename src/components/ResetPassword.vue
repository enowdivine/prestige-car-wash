<template>
  <span>
    <h2>Reset Password</h2>
    <v-textarea
      v-model="infoData.token"
      outlined
      name="input-7-4"
      label="Token"
    ></v-textarea>

    <v-text-field
      color="rgb(109, 199, 109)"
      v-model="infoData.password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min]"
      :type="show1 ? 'text' : 'password'"
      name="input-10-1"
      label="Password"
      hint="At least 8 characters"
      counter
      @click:append="show1 = !show1"
      outlined
    ></v-text-field>

    <v-text-field
      color="rgb(109, 199, 109)"
      v-model="confirmPassword"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min]"
      :type="show1 ? 'text' : 'password'"
      name="input-10-1"
      label="Confirm Password"
      hint="At least 8 characters"
      counter
      @click:append="show1 = !show1"
      outlined
    ></v-text-field>
    <v-btn
      color="rgb(109, 199, 109)"
      @click="submit"
      :loading="load"
      depressed
      dark
      block
      >Submit</v-btn
    >
    <br />
  </span>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      forgot: false,
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      password: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        emailMatch: () => `The email and password you entered don't match`,
      },
      infoData: {
        token: "",
        password: "",
      },
      confirmPassword: "",
      load: false,
    };
  },
  methods: {
    submit() {
      if (this.password != this.confirmPassword) {
        alert("Passwords do not match");
      } else {
        this.load = true;
        axios
          .post("/auth/reset_pass", this.infoData)
          .then((res) => {
            if (res.data.succes) {
              this.load = false;
              this.$router.push("/dashboard");
            }
          })
          .catch((err) => {
            this.load = false;
            console.log(err);
          });
      }
    },
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 10px;
}
</style>
