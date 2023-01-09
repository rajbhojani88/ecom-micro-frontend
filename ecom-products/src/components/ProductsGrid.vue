<template>
  <v-container fluid>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      hide-default-footer
    >
      <template v-slot:header>
        <Filters v-bind="$props" />
        <v-row class="mt-2" align="center" justify="center">
          <v-spacer></v-spacer>
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
      </template>
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card max-width="250" max-heith="250" align="center">
              <v-img :src="item.image" width="150" height="150"></v-img>

              <v-card-text class="title h3 red--text">
                <router-link :to="'/product/' + item._id">
                  {{ item.name }}
                </router-link>
              </v-card-text>
              <v-card-actions color="">
                <EditProduct v-if="isAdmin" :product="item" />
                <v-btn
                  v-if="isAdmin"
                  color="blue-grey"
                  class="ma-2 white--text"
                  fab
                  @click="addToCart(item._id)"
                >
                  <v-icon dark> mdi-cart-arrow-down </v-icon>
                </v-btn>
                <v-btn
                  v-if="isAdmin"
                  class="mx-2"
                  fab
                  dark
                  large
                  color="red"
                  @click="deleteProduct(item._id)"
                  icon
                >
                  <v-icon>delete </v-icon>
                </v-btn>
              </v-card-actions>
              <v-card-actions>
                <v-btn
                  v-if="!isAdmin"
                  block
                  class="white--text"
                  color="deep-purple accent-4"
                  @click="addToCart(item._id)"
                >
                  Add to Cart
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="ma-4" align="center" justify="center">
          <v-spacer></v-spacer>

          <span class="mr-4 grey--text">
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import common from "@/mixins/common.js";
import Filters from "@/components/Filters";
import EditProduct from "@/components/EditProduct";
export default {
  name: "ProductsList",
  props: ["isAuthenticated", "authUser"],
  components: {
    Filters,
    EditProduct,
  },
  async mounted() {
    console.log(`the component is now mounted.`);
    const filter = { name: "", category: "", range: [0, 999999] };
    await this.$store.dispatch("getAllProducts", filter);
    await this.$store.dispatch("getAllCategory");
  },
  mixins: [common],
  data() {
    return {
      rating: 5,
      itemsPerPageArray: [4, 8, 12],
      page: 1,
      itemsPerPage: 8,
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    isAdmin() {
      return (this.authUser && this.authUser.role) === "admin";
    },
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    async addToCart(itemId) {
      if (this.isAuthenticated) {
        await this.$store.dispatch("addToCart", { product: itemId });
      } else {
        this.$router.push({ path: "/login" });
      }
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
  },
};
</script>
