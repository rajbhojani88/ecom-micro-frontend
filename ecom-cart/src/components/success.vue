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
      src="https://openjournalsystems.com/file/2017/07/payment-success.png"
    ></v-img>
    <v-card-title>Payment Successfull</v-card-title>
    <v-card-text>
      <div class="my-4 text-subtitle-1">Transecttion ID: 23u584609</div>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>
    <v-card-title>Amount Paid: $1111</v-card-title>
    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text to="/"> Buy Again </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  name: "success",
  async beforeMount() {
    await axios
      .delete("/api/clearCart")
      .then((data) => {
        console.log(data);
      })
      .catch(({ response }) => {
        this.$toast.error(response.data.message, {
          timeout: 5000,
          pauseOnHover: true,
        });
      });
  },
  data: () => ({
    loading: false,
  }),
};
</script>

<style scoped></style>
