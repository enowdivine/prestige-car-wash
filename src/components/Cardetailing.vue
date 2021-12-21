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

export default {
  components: {
    Cardetailingregistered,
    Cardetailingguest,
  },
};
</script>

<style scoped>
.board {
  width: 100%;
  height: 100%;
  
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
