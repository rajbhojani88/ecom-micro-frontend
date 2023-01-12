import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/auth/login";
import Register from "../views/auth/register";
import Profile from "../views/user/profile";
import ProductDetails from "products/ProductDetails";
import Cart from "cart/CartView";
import Success from "cart/Success";
import Failed from "cart/Failed";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/profile",
    name: "userInfoView",
    component: Profile,
  },
  {
    path: "/product/:id",
    name: "productDetails",
    component: ProductDetails,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/payment/success",
    name: "Success",
    component: Success,
  },
  {
    path: "/payment/failed",
    name: "Failed",
    component: Failed,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let isAuthenticated = store.getters.isAuthenticated;
  if (
    to.name !== "Login" &&
    to.name !== "Register" &&
    to.name !== "home" &&
    !isAuthenticated
  ) {
    next({ name: "Login" });
  } else if (
    (to.name === "Login" || to.name === "Register") &&
    isAuthenticated
  ) {
    next({ name: "home" });
  } else next();
});

export default router;
