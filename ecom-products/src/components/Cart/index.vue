<template>
  <v-container>
    <h2 class="display-2 mb-4">Cart</h2>
    <v-list subheader two-line>
      <v-divider inset></v-divider>
      <v-alert v-if="total == null" class="mt-2" type="info"> Cart is Empty. </v-alert>
      <v-list-item
        v-for="cartProduct in products"
        :key="cartProduct.product._id"
      >
        <v-avatar size="66px">
          <v-img
            max-height="100"
            max-width="100"
            :src="cartProduct.product.image"
          />
        </v-avatar>

        <v-list-item-content>
          <v-list-item-title
            v-text="cartProduct.product.name"
          ></v-list-item-title>

          <v-list-item-subtitle
            v-text="cartProduct.product.category"
          ></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn @click="deleteCartProduct(cartProduct._id)" icon>
            <v-icon color="grey lighten-1">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-divider inset></v-divider>
    </v-list>
    <v-container>
      <strong v-if="total != null" class="text-h4" style="float: right">{{
        "$ " + total
      }}</strong>
    </v-container>
    <v-container class="pt-3">
      <stripe-checkout
        ref="checkoutRef"
        mode="payment"
        :pk="publishableKey"
        :line-items="lineItems"
        :success-url="successURL"
        :cancel-url="cancelURL"
        @loading="(v) => (loading = v)"
      />
      <v-btn color="success" v-if="total != null" @click="submit" larger
        >Go to payment</v-btn
      >
    </v-container>
  </v-container>
</template>

<script>
import { StripeCheckout } from "@vue-stripe/vue-stripe";
export default {
  name: "cart",
  components: {
    StripeCheckout,
  },
  data() {
    this.publishableKey =
      "pk_test_51M9UsHSE78tWZVrvyCWofyw8G1P1sAutcOWkaXBAWkl3aVFiYOAOmNHYeO9uAorLEY7rsurH1k0JvshKsCzIbNHR00enszOZHf";
    return {
      loading: false,
      successURL: "http://localhost:3000/payment/success",
      cancelURL: "http://localhost:3000/payment/failed",
    };
  },
  async beforeMount() {
    await this.$store.dispatch("getCartProducts");
  },
  computed: {
    products() {
      return this.$store.getters.getCartProducts;
    },
    total() {
      return this.$store.getters.getCartTotal;
    },
    lineItems() {
      return this.$store.getters.getLineItems;
    },
  },
  methods: {
    async deleteCartProduct(id) {
      await this.$store.dispatch("deletetCartProduct", id);
      await this.$store.dispatch("getCartProducts");
    },
    submit() {
      // You will be redirected to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout();
    },
  },
};
</script>

<style scoped></style>
