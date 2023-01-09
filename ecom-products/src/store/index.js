import Vue from "vue";
import Vuex from "vuex";
import productsModule from "./productsModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    productsModule,
  },
});
