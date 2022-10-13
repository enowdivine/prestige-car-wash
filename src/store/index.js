import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";

Vue.use(Vuex);
axios.defaults.baseURL = "https://car-wash-backend.herokuapp.com/api";
axios.defaults.headers.post["Content-Type"] = "application/json";
export default new Vuex.Store({
  modules: {
    auth,
  },
});
