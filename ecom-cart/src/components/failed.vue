<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="374">
    <template v-slot:progress>
      <v-progress-linear
        color="deep-purple"
        height="12"
        indeterminate
      ></v-progress-linear>
    </template>
    <v-img
      height="100%"
      src="https://static.vecteezy.com/system/resources/previews/009/384/818/original/prohibition-sign-clipart-design-illustration-free-png.png"
    ></v-img>
    <v-card-title>Payment Successfull</v-card-title>
    <v-divider class="mx-4"></v-divider>
    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text to="/"> Buy Again </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
export default {
  name: "payment-failed",
  data: () => ({
    loading: false,
  }),
};
</script>

<style scoped></style>
