import axios from "axios";

axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");

export default {
  namespaced: true,
  state: {
    user: {
      email: "",
    },
  },
  getters: {
    getUser(state) {
      return state.user.email;
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user.email = payload.data.email;
    },
  },
  actions: {
    async login({ commit }, payload) {
      let result = await axios.post("/auth/login", payload);
      if (result.data.success) {
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("login", true);
        commit("setUser", result);
        return {
          success: true,
          msg: result.data.msg,
        };
      }
      return {
        success: false,
        msg: result.data.msg,
      };
    },
    // recoverPassword(payload) {

    // },
  },
};
