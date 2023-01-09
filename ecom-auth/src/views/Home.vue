<template>
  <v-container>
    <router-link to="/login">login</router-link>
    <br />
    <router-link to="/register">register</router-link>
    <br />
    <router-link to="/profile">profile</router-link>
    <br />
    <v-btn @click="logout">logout</v-btn>
  </v-container>
</template>

<script>
import Cookies from "js-cookie";
export default {
  name: "home",
  methods: {
    async logout() {
      this.$toast.info("Logging Out...", {
        position: "bottom-right",
        timeout: 5000,
        pauseOnHover: true,
      });
      await new Promise((resolve) => setTimeout(resolve, 3000));
      Cookies.remove("ecom-token");
      Cookies.remove("ecom-user");
      window.location.reload();
    },
  },
};
</script>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
