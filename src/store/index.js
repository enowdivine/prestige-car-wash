import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";

Vue.use(Vuex);
// axios.defaults.baseURL = "https://car-wash-backend.herokuapp.com/api";
axios.defaults.baseURL = " http://localhost:4000/api";
export default new Vuex.Store({
  modules: {
    auth,
  },
});
