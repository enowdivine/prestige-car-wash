<template>
  <v-tabs centered color="rgb(109, 199, 109)">
    <v-tab>Registered Clients</v-tab>
    <v-tab>Guest Clients</v-tab>

    <v-tab-item>
      <div>
        <RegisteredRR class="RR" />
      </div>
    </v-tab-item>

    <v-tab-item>
      <div>
        <GuestRR class="RR" />
      </div>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import GuestRR from "./GuestRR.vue";
import RegisteredRR from "./RegisteredRR.vue";
export default {
  components: { RegisteredRR, GuestRR },
  data: () => ({}),
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
.RR {
  padding: 30px;
}
</style>
