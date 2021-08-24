import axios from "axios";

export default { 
  namespaced: true,
  state: {
     user: {
        email: "",
     },
     
  },
  getters: {
   getUser(state){
      return state.user.email
   }
  },
  mutations: {
     setUser(state, payload){
        state.user.email = payload.data.email;
     }
  },
  actions: {
     login({commit}, payload){
        axios.post("/auth/login", payload).then((res) => {
           localStorage.setItem('token', res.data.token)
           localStorage.setItem('login', true)
          commit('setUser', res)
        })
        return true
     },
     recoverPassword(payload){
        
     }

  },

};
