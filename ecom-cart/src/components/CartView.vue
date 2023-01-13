<template>
  <v-container>
    <h2 class="display-2 mb-4">Cart</h2>
    <v-list subheader two-line>
      <v-divider inset></v-divider>
      <v-alert v-if="total == null" class="mt-2" type="info">
        Cart is Empty.
      </v-alert>
      <v-list-item
        v-for="cartProduct in cartProducts"
        :key="cartProduct.product._id"
      >
        <v-list-item-avatar size="66px">
          <v-img
            max-height="100"
            max-width="100"
            :src="cartProduct.product.image"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            v-text="cartProduct.product.name"
          ></v-list-item-title>

          <v-list-item-subtitle
            v-text="cartProduct.product.category"
          ></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon
              color="grey lighten-1"
              @click="deleteCartProduct(cartProduct._id)"
              >mdi-delete</v-icon
            >
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

<script lang="ts">
import { StripeCheckout } from "@vue-stripe/vue-stripe";
import axios from "axios";
import Vue from "vue";

interface CartProducts {
  qty: string;
  product: {
    stripe_price_id: string;
  };
}
// Note the Vue.extend
export default Vue.extend({
  name: "CartView",
  components: {
    StripeCheckout,
  },
  async beforeMount() {
    this.getCartProductList();
  },
  data: () => ({
    publishableKey:
      "pk_test_51M9UsHSE78tWZVrvyCWofyw8G1P1sAutcOWkaXBAWkl3aVFiYOAOmNHYeO9uAorLEY7rsurH1k0JvshKsCzIbNHR00enszOZHf",
    loading: false,
    successURL: "http://localhost:3000/payment/success",
    cancelURL: "http://localhost:3000/payment/failed",
    cartProducts: [],
    total: 0,
  }),
  computed: {
    lineItems() {
      let items = this.cartProducts.map(function (element: CartProducts) {
        return {
          quantity: element.qty,
          price: element.product.stripe_price_id,
        };
      });
      return items;
    },
  },
  methods: {
    async deleteCartProduct(id: string) {
      await axios
        .delete("/api/cart/" + id)
        .then(({ data }) => {
          this.$toast.success(data.message, {
            timeout: 5000,
            pauseOnHover: true,
          });
        })
        .catch(({ response }) => {
          this.$toast.error(response.data.message, {
            timeout: 5000,
            pauseOnHover: true,
          });
        });
      await this.getCartProductList();
    },
    async getCartProductList() {
      await axios
        .get("/api/cart")
        .then(({ data }) => {
          this.cartProducts = data.products;
          this.total = data.total;
        })
        .catch(({ response }) => {
          this.$toast.error(response.data.message, {
            timeout: 5000,
            pauseOnHover: true,
          });
        });
    },
    submit() {
      const asf: any = this.$refs.checkoutRef;
      if (asf) asf.redirectToCheckout();
    },
  },
});
</script>

<style scoped></style>
