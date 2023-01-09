import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/auth/login";
import Register from "../views/auth/register";
import Profile from "../views/user/profile";
import store from "../store"

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
    name: "profile",
    component: Profile,
  },
];

const router = new VueRouter({
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
