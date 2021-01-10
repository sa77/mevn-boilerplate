import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/users/Dashboard.vue";

import store from "./store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/dashboard",
    name: "user-dashboard",
    component: Dashboard,
    beforeEnter(to, from, next) {
      if (store.state.accessToken) {
        next();
      } else {
        next({ name: "login", replace: true });
      }
    }
  },
  {
    path: "/:catchAll(.*)",
    component: Login
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(() => {
  store.commit("setErrorMessage", null);
});

export default router;
