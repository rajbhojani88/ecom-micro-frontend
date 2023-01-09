export default {
  data() {
    return {
      search: "",
      selectedCategory: "",
      range: [0, 999999]
    };
  },
  computed: {
    category() {
      return this.$store.getters.getCategory;
    },
    items() {
      return this.$store.getters.getProducts;
    }
  },
  methods: {
    async getAllProducts() {
      const filter = {
        name: this.search,
        category: this.selectedCategory,
        range: this.range
      };
      await this.$store.dispatch("getAllProducts", filter);
    },
    async deleteProduct(id) {
      await this.$store.dispatch("deletetProduct", id);
      this.getAllProducts();
    }
  }
};
