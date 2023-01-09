import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import Cookies from 'js-cookie'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 10,
  newestOnTop: true,
};

Vue.use(Toast, options);
Vue.use(VueAxios, axios);

Vue.component("Navbar", () => import("layouts/navbar"));
Vue.component("Footer", () => import("layouts/footer"));
Vue.component("ProductsList", () => import("products/ProductsList"));
Vue.component("ProductsGrid", () => import("products/ProductsGrid"));
Vue.component("authLogin", () => import("auth/login"));
Vue.component("authRegister", () => import("auth/register"));
Vue.component("userInfo", () => import("auth/profile"));

Vue.config.productionTip = false;

axios.interceptors.request.use((config) => {
  const token = Cookies.get('ecom-token');
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
