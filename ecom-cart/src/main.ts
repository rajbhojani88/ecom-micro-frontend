import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import Toast, { PluginOptions, POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

loadFonts();

const options: PluginOptions = {
  position: POSITION.BOTTOM_RIGHT,
  // You can set your default options here
};
loadFonts();

createApp(App).use(router).use(Toast, options).use(vuetify).mount("#app");
