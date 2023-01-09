<template>
  <v-toolbar dark color="blue darken-3" class="mb-1">
    <v-text-field
      v-model="search"
      clearable
      flat
      @change="getAllProducts"
      solo-inverted
      hide-details
      prepend-inner-icon="mdi-magnify"
      label="Search Product"
    ></v-text-field>
    <template v-if="$vuetify.breakpoint.mdAndUp">
      <v-spacer></v-spacer>
      <v-select
        v-model="selectedCategory"
        flat
        @change="getAllProducts"
        solo-inverted
        :clearable="true"
        hide-details
        :items="category"
        prepend-inner-icon="mdi-magnify"
        label="Category"
      ></v-select>
      <v-spacer></v-spacer>
      <v-row justify="center">
        <v-col class="px-4" sm="2">
          <span class="align-center">Price:</span>
        </v-col>
        <v-col class="px-4" sm="10">
          <v-range-slider
            v-model="range"
            :max="max"
            @change="getAllProducts"
            :min="min"
            hide-details
            class="align-center"
          >
            <template v-slot:prepend>
              {{ range[0] }}
            </template>
            <template v-slot:append>
              {{ range[1] }}
            </template>
          </v-range-slider>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <AddProduct v-if="isAdmin" />
      <AddCategory v-if="isAdmin" />
    </template>
  </v-toolbar>
</template>
<script>
import common from "@/mixins/common.js";
import AddProduct from "@/components/AddProduct";
import AddCategory from "@/components/AddCategory";
export default {
  name: "Filters",
  props: ["isAuthenticated", "authUser"],
  components: {
    AddCategory,
    AddProduct,
  },
  computed: {
    isAdmin() {
      return ( this.authUser && this.authUser.role )  === "admin";
    },
  },
  mixins: [common],
  data() {
    return {
      min: 0,
      max: 999999,
    };
  },
};
</script>
