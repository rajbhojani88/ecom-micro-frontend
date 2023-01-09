<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" class="mr-md-4" dark v-bind="attrs" v-on="on">
        <v-icon left> mdi-plus </v-icon>Product
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Add Product</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="addform">
            <v-text-field
              v-model="productData.name"
              label="Name"
              :rules="nameRules"
              required
            ></v-text-field>
            <v-select
              v-model="productData.category"
              :items="category"
              label="category"
              :rules="categoryRules"
            ></v-select>
            <v-text-field
              v-model="productData.image"
              label="image url"
              :rules="imageRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="productData.price"
              label="price"
              prefix="$"
              max="999999"
              min="0"
              oninput="validity.valid||(value='');"
              type="number"
              required
            ></v-text-field>
            <v-text-field
              v-model="productData.discount"
              label="discount"
              min="0"
              max="99"
              oninput="validity.valid||(value='');"
              suffix="%"
              type="number"
              required
            ></v-text-field>
            <v-text-field
              v-model="productData.netprice"
              label="netprice"
              type="number"
              readonly
              prefix="$"
              required
            ></v-text-field>
            <v-text-field
              v-model="productData.discription"
              label="discription"
              :rules="discriptionRules"
              required
            ></v-text-field>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="addProduct"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import common from "@/mixins/common.js";
export default {
  mixins: [common],
  data: () => ({
    dialog: false,
    nameRules: [(v) => !!v || "Name is required"],
    categoryRules: [(v) => !!v || "Category is required"],
    imageRules: [(v) => !!v || "image is required"],
    discriptionRules: [(v) => !!v || "discription is required"],
    productData: {
      name: "",
      category: "",
      image: "",
      price: 0,
      discount: 0,
      netprice: 0,
      discription: "",
    },
  }),
  computed: {
    netprice() {
      return Math.round(
        this.productData.price -
          (this.productData.price * this.productData.discount) / 100
      );
    },
  },
  watch: {
    netprice: function (val) {
      this.productData.netprice = this.netprice;
    },
  },
  methods: {
    async addProduct() {
      let valid = this.$refs.addform.validate();
      if (valid) {
        this.dialog = false;
        await this.$store.dispatch("addProduct", this.productData);
        this.getAllProducts();
      }
    },
  },
};
</script>

<style></style>
