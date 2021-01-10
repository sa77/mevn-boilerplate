import { createStore } from "vuex";
import axios from "./axiosConfig";
import router from "./router";

const store = createStore({
  state: {
    accessToken: null,
    user: null,
    error: null
  },
  getters: {
    user(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return state.accessToken !== null;
    }
  },
  mutations: {
    setAuthUser(state, authData) {
      const { user, access, refresh } = authData;
      state.accessToken = access;
      state.user = user;
      // session persistence
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
    },
    clearAuthData(state) {
      state.accessToken = null;
      state.user = null;
      // flush
      localStorage.clear();
    },
    setErrorMessage(state, payload) {
      state.error = payload;
    },
    clearErrorMessage(state) {
      state.error = null;
    }
  },
  actions: {
    register({ commit }, authData) {
      console.log("Signup --", authData);
      axios
        .post("/users/register/", authData)
        .then(res => {
          // vuex state
          commit("setAuthUser", res.data);
          // navigate
          router.replace("/dashboard");
        })
        .catch(error => {
          const { response } = error;
          commit("setErrorMessage", response.data);
        });
    },
    login({ commit }, authData) {
      console.log("Login --", authData);
      axios
        .post("/users/login/", authData)
        .then(res => {
          // vuex state
          commit("setAuthUser", res.data);
          // navigate
          router.replace("/dashboard");
        })
        .catch(error => {
          const { response } = error;
          commit("setErrorMessage", response.data);
        });
    },
    logout({ commit }) {
      router.replace("/login");
      commit("clearAuthData");
    }
  }
});

export default store;
