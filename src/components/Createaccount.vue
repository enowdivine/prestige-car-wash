<template>
  <v-form
  >

  <div>
     <input class="form-control" type="text" name="name" placeholder="Enter name" required>
  </div>
  <div>
     <input class="form-control" type="email" name="email" placeholder="Enter email" required>
  </div>
  <div>
     <input class="form-control" type="number" name="number" placeholder="Phone Number" required>
  </div>
  <div>
     <input class="form-control" type="number" name="carNumber" placeholder="Car Number" required>
  </div>
  <div>
     <input class="form-control" type="text" name="text" placeholder="Occupation" required>
  </div>
  <div>
     <input class="form-control" type="text" name="text" placeholder="Address" required>
  </div>
  <div>
    <select class="form-control" name="cars" id="cars">
      <option disabled selected value> -- Choose a car -- </option>
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="mercedes">Mercedes</option>
      <option value="audi">Audi</option>
    </select>
  </div>
  <div>
    <select class="form-control" name="service" id="service">
      <option disabled selected value> -- Choose package -- </option>
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="mercedes">Mercedes</option>
      <option value="audi">Audi</option>
    </select>
  </div>
  <div>
    <select class="form-control" name="gender" id="gender">
      <option disabled selected value> -- Gender -- </option>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
  </div>
  <div>
    <v-btn block color="rgb(109, 199, 109)" dark>Submit</v-btn>
  </div>

  </v-form>
</template>

<script>
  
</script>

<style scoped>
.v-form{
  border: 1px solid rgb(109, 199, 109);
  border-radius: 5px;
  margin-bottom: 50px;
}
div{
  width: 80%;
  margin: auto;
}
  .form-control{
    width: 100%;
    padding: 10px;
    border: 1px solid black;
    outline-color: rgb(109, 199, 109);
    border-radius: 5px;
    display: block;
    margin: 20px auto;
  }
  .v-btn{
    margin-bottom: 30px;
  }
</style>