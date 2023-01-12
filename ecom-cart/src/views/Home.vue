<template>
  <v-container>
    <CartView />
  </v-container>
</template>

<script>
// @ is an alias to /src
import CartView from "../components/CartView.vue";
export default {
  name: "home",
  components: {
    CartView,
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
