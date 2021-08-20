<template>
  <div class="card">
    <div class="box">
      <div class="left">
        <img width="200" src="/logo.png" alt="" />
        <h1>PRESTIGE CAR WASH</h1>
        <p>The Number one car cleaning center in Cameroon</p>
      </div>
      <div class="right">
        <v-form>
          <v-container v-if="!forgot">
            <h2>Log in</h2>
            <v-text-field
              color="rgb(109, 199, 109)"
              label="Email"
              :rules="[rules.required, rules.email]"
              outlined
            ></v-text-field>

            <v-text-field
              color="rgb(109, 199, 109)"
              v-model="password"
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
            <v-btn color="rgb(109, 199, 109)" depressed dark block
              >Submit</v-btn
            >
            <br />

            <v-btn
              @click="forgot = true"
              class="mt-3"
              text
              color="rgb(109, 199, 109)"
              depressed
              >Forgot password</v-btn
            >
          </v-container>
          <v-container v-if="forgot && !reset">
            <Forgotpassword @reset="reset = true" @know="forgot = false" />
          </v-container>
          <v-container v-if="forgot && reset">
            <ResetPassword class="resetpassword" />
          </v-container>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import Forgotpassword from "./Forgotpassword";
import ResetPassword from "./ResetPassword.vue";
export default {
  components: {
    Forgotpassword,
    ResetPassword,
  },
  data() {
    return {
      forgot: false,
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      reset: false,
      password: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
};
</script>

<style scoped>
.card {
  box-shadow: 5px 5px 8px 5px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 70%;
  min-height: 80%;
}
.left {
  padding: 15% 0 0 5%;
}

.right {
  padding: 15% 10% 0 20%;
}

.box {
  display: flex;
}

h2 {
  margin-bottom: 10px;
}
.resetpassword {
  position: relative;
  top: -50px;
}
</style>
