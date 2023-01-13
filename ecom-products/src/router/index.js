import Vue from "vue";
import VueRouter from "vue-router";
import ProductsListView from "../views/ProductsListView.vue";
import ProductsGridView from "../views/ProductsGridView.vue";
import Home from "../views/Home.vue";
import ProductDetails from "../components/ProductDetails.vue";
import Cookies from "js-cookie";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/products-grid-view",
    name: "ProductsGridView",
    component: ProductsGridView,
  },
  {
    path: "/products-list-view",
    name: "ProductsListView",
    component: ProductsListView,
  },
  {
    path: "/product/:id",
    name: "productDetails",
    component: ProductDetails,
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const token = Cookies.get("ecom-token");
  let isAuthenticated = token != null && token != undefined;
  if (
    (to.name === "Cart" || to.name === "Success" || to.name === "Failed") &&
    !isAuthenticated
  ) {
    next({ name: "home" });
  } else {
    next();
  }
});
export default router;
