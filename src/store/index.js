import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
axios.defaults.baseURL = "https://car-wash-backend.herokuapp.com/api";
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {},
});
