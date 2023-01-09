import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 10,
  newestOnTop: true,
};

Vue.config.productionTip = false
Vue.use(Toast, options);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
