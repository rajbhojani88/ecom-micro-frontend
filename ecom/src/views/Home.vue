<template>
  <ProductsGrid
    :isAuthenticated="this.$store.getters.isAuthenticated"
    :authUser="this.$store.getters.getUserInfo"
  />
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
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
