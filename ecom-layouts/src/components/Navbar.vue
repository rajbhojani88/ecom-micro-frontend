<template>
  <nav>
    <v-app-bar color="white" light app class="line">
      <v-toolbar-title class="text-uppercase red--text">
        <span class="font-weight-light">Ecom </span>
        <span>Inventory</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items color="deep-purple accent-4">
        <v-btn v-if="!isAuthenticated" to="/login" depressed> Login</v-btn>
        <v-btn v-if="!isAuthenticated" to="/register" depressed>
          Register</v-btn
        >
      </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer
      v-if="isAuthenticated"
      v-model="drawer"
      :mini-variant.sync="mini"
      dark
      app
      class="red"
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>{{ authUser.fullname }}</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          router
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list style="position: absolute; bottom: 0" flat>
        <v-list-item @click="logout">
          <v-list-item-action>
            <v-icon>fas fa-sign-out-alt</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import Cookies from "js-cookie";
export default {
  props: ["isAuthenticated", "authUser"],
  data: () => ({
    drawer: true,
    items: [
      { title: "Home", icon: "mdi-home-city", to: "/" },
      { title: "My Account", icon: "mdi-account", to: "/profile" },
      { title: "Cart", icon: "mdi-cart", to: "/cart" },
    ],
    mini: true,
  }),
  components: {},
  methods: {
    logout() {
      this.$toast.info("Logging Out...", {
        position: "bottom-right",
        timeout: 5000,
        pauseOnHover: true,
      });
      Cookies.remove("ecom-token");
      Cookies.remove("ecom-user");
      window.location.reload();
    },
  },
};
</script>
<style scoped>
.border {
  border-left: 4px solid #0ba518;
}
</style>
