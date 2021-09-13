<template>
  <div class="main">
    <v-row>
      <v-col class="left"></v-col>
      <v-col class="right"></v-col>
    </v-row>
    <Login class="form" />
  </div>
</template>

<script>
import Login from "../../components/Login.vue";
export default {
  name: "login",
  components: {
    Login,
  },
};
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.left {
  height: 100vh;
  background-color: rgb(109, 199, 109);
  width: 70%;
}
.form {
  position: absolute;
}
</style>
