<template>
  <v-container>
    <ProductsList :isAuthenticated="isAuthenticated" :authUser="getUserInfo" />
  </v-container>
</template>

<script>
// @ is an alias to /src
import ProductsList from "@/components/ProductsList";
import Cookies from "js-cookie";
export default {
  name: "ProductsView",
  components: {
    ProductsList,
  },
  async mounted() {
    const token = Cookies.get("ecom-token");
    if (Cookies.get("ecom-user") != undefined) {
      this.getUserInfo  = JSON.parse(Cookies.get("ecom-user"));
    }
    this.isAuthenticated = token != null && token != undefined;
  },
  data() {
    return {
      isAuthenticated: null,
      getUserInfo: null,
    };
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
