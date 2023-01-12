<template>
  <CartView />
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import CartView from "../components/CartView.vue";

export default defineComponent({
  name: "HomeView",

  components: {
    CartView,
  },
});
</script>
