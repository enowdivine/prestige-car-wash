import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueHtmlToPaper from "vue-html-to-paper";

Vue.config.productionTip = false;

Vue.use(VueHtmlToPaper);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
