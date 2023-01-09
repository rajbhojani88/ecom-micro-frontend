import axios from "axios";

const state = {
  products: [],
  product: null,
  category: [],
  cartProducts: [],
  cartTotal: 0,
};

const getters = {
  getCategory(state) {
    return state.category;
  },
  getProducts(state) {
    return state.products;
  },
  getProduct(state) {
    return state.product;
  },
  getCartProducts(state) {
    return state.cartProducts;
  },
  getCartTotal(state) {
    return state.cartTotal;
  },
  getLineItems(state) {
    let userFullnames = state.cartProducts.map(function (element) {
      return { quantity: element.qty, price: element.product.stripe_price_id };
    });
    return userFullnames;
  },
};

const mutations = {
  setCategory(state, data) {
    if (data) {
      state.category = data;
    } else {
      state.category = [];
    }
  },
  setProducts(state, data) {
    if (data) {
      state.products = data;
    } else {
      state.products = [];
    }
  },
  setProduct(state, data) {
    if (data) {
      state.product = data;
    } else {
      state.product = null;
    }
  },
  setCartProducts(state, data) {
    if (data) {
      state.cartProducts = data;
    } else {
      state.cartProducts = null;
    }
  },
  setCartTotal(state, data) {
    if (data) {
      state.cartTotal = data;
    } else {
      state.cartTotal = null;
    }
  },
};

const actions = {
  async getAllCategory({ commit }) {
    await axios
      .get("/api/category")
      .then(({ data }) => {
        commit("setCategory", data.category);
      })
      .catch(({ response }) => {
        this._vm.$toast.error(response.data.message, {
          position: "bottom-right",
          timeout: 5000,
          pauseOnHover: true,
        });
      });
  },
  async addCategory({ commit }, data) {
    await axios
      .post("/api/category", data)
      .then(({ data }) => {
        this._vm.$toast.success(data.message, {
          position: "bottom-right",
          timeout: 5000,
          pauseOnHover: true,
        });
        return data.status;
      })
      .catch(({ response }) => {
        this._vm.$toast.error(response.data.message, {
          position: "bottom-right",
          timeout: 5000,
          pauseOnHover: true,
        });
        return "error";
      });
  },
  async getAllProducts({ commit }, data) {
    await axios
      .get("/api/products", { params: data })
      .then(({ data }) => {
        commit("setProducts", data.products);
      })
      .catch(({ response }) => {
        this._vm.$toast.error(response.data.message, {
          position: "bottom-right",
          timeout: 5000,
          pauseOnHover: true,
        });
      });
  },
  async getProduct({ commit }, id) {
    await axios
      .get("/api/product/" + id)
      .then(({ data }) => {
        commit("setProduct", data.product);
      })
      .catch(({ response }) => {
        this._vm.$toast.error(response.data.message, {
          position: "bottom-right",
          timeout: 5000,
          pauseOnHover: true,
        });
      });
  },
  async addProduct({ commit }, data) {
    await axios
      .post("/api/product", data)
      .then(({ data }) => {
        this._vm.$toast.success(data.message, {
          position: "bottom-right",
          timeout: 5000,
          pauseOnHover: true,
        });
        return data.status;
      })
      .catch(({ response }) => {
        this._vm.$toast.error(response.data.message, {
          position: "bottom-right",
          timeout: 5000,
          pauseOnHover: true,
        });
        return "error";
      });
  },
  async editProduct({ commit }, data) {
    await axios
      .put("/api/product", data)
      .then(({ data }) => {
        this._vm.$toast.success(data.message, {
          position: "bottom-right",
          timeout: 5000,
          pauseOnHover: true,
        });
        return data.status;
      })
      .catch(({ response }) => {
        this._vm.$toast.error(response.data.message, {
          position: "bottom-right",
          timeout: 5000,
          pauseOnHover: true,
        });
      });
  },
  async deletetProduct({ commit }, id) {
    await axios
      .delete("/api/product/" + id)
      .then(({ data }) => {
        this._vm.$toast.success(data.message, {
          position: "bottom-right",
          timeout: 5000,
          pauseOnHover: true,
        });
      })
      .catch(({ response }) => {
        this._vm.$toast.error(response.data.message, {
          position: "bottom-right",
          timeout: 5000,
          pauseOnHover: true,
        });
      });
  },
  async getCartProducts({ commit }, id) {
    await axios
      .get("/api/cart")
      .then(({ data }) => {
        commit("setCartProducts", data.products);
        commit("setCartTotal", data.total);
      })
      .catch(({ response }) => {
        this._vm.$toast.error(response.data.message, {
          position: "bottom-right",
          timeout: 5000,
          pauseOnHover: true,
        });
      });
  },
  async addToCart({ commit }, data) {
    await axios
      .post("/api/cart", data)
      .then(({ data }) => {
        this._vm.$toast.success(data.message, {
          position: "bottom-right",
          timeout: 5000,
          pauseOnHover: true,
        });
        return data.status;
      })
      .catch(({ response }) => {
        this._vm.$toast.error(response.data.message, {
          position: "bottom-right",
          timeout: 5000,
          pauseOnHover: true,
        });
        return "error";
      });
  },
  async deletetCartProduct({ commit }, id) {
    await axios
      .delete("/api/cart/" + id)
      .then(({ data }) => {
        this._vm.$toast.success(data.message, {
          position: "bottom-right",
          timeout: 5000,
          pauseOnHover: true,
        });
      })
      .catch(({ response }) => {
        this._vm.$toast.error(response.data.message, {
          position: "bottom-right",
          timeout: 5000,
          pauseOnHover: true,
        });
      });
  },
  async clearCart({ commit }) {
    await axios
      .delete("/api/clearCart")
      .then((data) => {
        console.log(data);
      })
      .catch(({ response }) => {
        this._vm.$toast.error(response.data.message, {
          position: "bottom-right",
          timeout: 5000,
          pauseOnHover: true,
        });
      });
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
