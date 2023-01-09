<template>
  <v-app>
    <Navbar
      :isAuthenticated="this.$store.getters.isAuthenticated"
      :authUser="this.$store.getters.getUserInfo"
    />
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
