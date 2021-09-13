<template>
  <div>
    <div class="guestClient">Guest Clients</div>
    <span :loading="load" class="amount">{{ totalAmount }} FCFA</span>
  </div>
</template>

<script>
//importing axios and adding token to headers
import axios from "axios";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");

export default {
  data: () => ({
    load: null,
  }),

  beforeMount() {
    this.load = true;
    let cost = 0;
    axios.get("/guest/get_activities").then((res) => {
      res.data.forEach((item) => {
        cost = item.cost + cost;
        console.log(cost);
      });
    });
    this.totalAmount = cost;
    this.load = false;
  },
};
</script>

<style scoped>
.guestClient {
  font-weight: bold;
  color: rgb(109, 199, 109);
}
.amount {
  font-weight: bold;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
