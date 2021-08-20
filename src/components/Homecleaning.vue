<template>
  <v-tabs centered color="rgb(109, 199, 109)">
    <v-tab>Registered Clients</v-tab>
    <v-tab>Guest Clients</v-tab>

    <v-tab-item>
      <v-form>
        <v-text-field
          color="rgb(109, 199, 109)"
          v-model="name"
          outlined
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          color="rgb(109, 199, 109)"
          v-model="email"
          outlined
          label="Email"
          required
        ></v-text-field>
        <v-text-field
          color="rgb(109, 199, 109)"
          v-model="address"
          outlined
          label="Address"
          required
        ></v-text-field>

        <v-btn block color="rgb(109, 199, 109)" dark>Submit</v-btn>
      </v-form>
    </v-tab-item>

    <v-tab-item>
      <v-form>
        <v-text-field
          color="rgb(109, 199, 109)"
          v-model="name"
          outlined
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          color="rgb(109, 199, 109)"
          v-model="contact"
          outlined
          label="Contact"
          required
        ></v-text-field>
        <v-text-field
          color="rgb(109, 199, 109)"
          v-model="address"
          outlined
          label="Address"
          required
        ></v-text-field>
       

        <v-btn block color="rgb(109, 199, 109)" dark>Submit</v-btn>
      </v-form>
    </v-tab-item>
  </v-tabs>
</template>

<script>
export default {
  data: () => ({
    
  }),
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
</style>
