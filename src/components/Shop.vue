<template>
  <div class="board">
    <v-tabs centered color="rgb(109, 199, 109)">
      <v-tab>Sales</v-tab>
      <v-tab>Products</v-tab>
      <v-tab-item>
        <Shopsales />
      </v-tab-item>

      <v-tab-item>
        <Shopproduct />
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import Shopproduct from "./Shopproduct.vue";
import Shopsales from "./Shopsales.vue";

export default {
  components: {
    Shopproduct,
    Shopsales,
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
</style>
