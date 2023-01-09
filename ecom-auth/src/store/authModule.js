import axios from "axios";
import Cookies from "js-cookie";

const state = {
  auth: {},
  token: null,
};

const getters = {
  isAuthenticated(state) {
    if (Cookies.get("ecom-token") != undefined) {
      state.token = Cookies.get("ecom-token");
    }
    return state.token != null; // auth object as default will be added in vuex state, when you initialize nuxt auth
  },
  getUserInfo(state) {
    if (Cookies.get("ecom-user") != undefined) {
      state.auth = JSON.parse(Cookies.get("ecom-user"));
    }
    return state.auth;
  },
};

const actions = {
  async login({ commit }, data) {
    await axios
      .post("/api/auth/login", data)
      .then(({ data }) => {
        Cookies.set("ecom-token", data.token, { expires: 1 / 48 });
        Cookies.set("ecom-user", JSON.stringify(data.userInfo), {
          expires: 1 / 48,
        });
        state.auth = data.userInfo;
        state.token = data.token;
      })
      .catch(({ response }) => {
        this._vm.$toast.error(response.data.message, {
          position: "bottom-right",
          timeout: 5000,
          pauseOnHover: true,
        });
      });
  },
  async register({ commit }, data) {
    await axios
      .post("/api/auth/register", data)
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
  async authUser({ commit }, data) {
    await axios
      .get("/api/auth/user", data)
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
};
export default {
  state,
  getters,
  actions,
};
