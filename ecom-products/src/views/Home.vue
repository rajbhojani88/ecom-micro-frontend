<template>
  <v-container>
    <router-link to="/">home</router-link>
    <br/>
    <router-link to="/products-list-view">products-list-view</router-link>
    <br/>
    <router-link to="/products-grid-view">products-grid-view</router-link>
    <br/>
    <router-link to="/cart">cart</router-link>
  </v-container>
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
