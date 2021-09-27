<template>
  <div class="board">
    <v-tabs centered color="rgb(109, 199, 109)">
      <v-tab>Registered Clients</v-tab>
      <v-tab>Guest Clients</v-tab>

      <v-tab-item>
        <div>
          <HomeCleaningRegistered />
        </div>
      </v-tab-item>

      <v-tab-item>
        <div>
          <HomeCleaningGuest />
        </div>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import HomeCleaningRegistered from "@/components/HomeCleaningRegistered";
import HomeCleaningGuest from "@/components/HomeCleaningGuest";

export default {
  components: {
    HomeCleaningRegistered,
    HomeCleaningGuest,
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
