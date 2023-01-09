import Vue from "vue";
import Vuex from "vuex";
import productsModule from "products/productsModule";
import authModule from "auth/authModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    productsModule,
    authModule,
  },
});
