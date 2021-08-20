<template>
  <span>
    <h2>Forgot Password</h2>
    <v-text-field label="Email" type="email" outlined></v-text-field>
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
export default {
  methods: {
    reset() {
      this.$emit("reset");
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
