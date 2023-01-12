import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import axios from 'axios'
import VueAxios from 'vue-axios'
import Cookies from 'js-cookie'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 10,
  newestOnTop: true,
};

Vue.config.productionTip = false;
Vue.use(VueAxios, axios)
Vue.use(Toast, options);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
