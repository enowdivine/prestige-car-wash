<template>
  <div class="text-center">
    <v-progress-circular
      :rotate="360"
      :size="170"
      :width="15"
      :value="calc"
      color="teal"
    >
      {{ salesRegClients + guestClients }} FCFA  
    </v-progress-circular>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        interval: {},
        salesRegClients:4000,
        guestClients:7000,
        totalGen: null,
      }
    },
   computed:{
    calc(){
      let total = this.salesRegClients + this.guestClients
      let totalPercReg = (this.salesRegClients/total)*100
      return totalPercReg
    }
   }
    
  }
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>