import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/user-dashboard",
    name: "userDashboard",
    component: () =>
      import(
        /* webpackChunkName: "userDashboard" */ "../views/UserDashboard.vue"
      ),
  },
  {
    path: "/pejabat-dashboard",
    name: "pejabatDashboard",
    component: () =>
      import(
        /* webpackChunkName: "pejabatDashboard" */ "../views/PejabatDashboard.vue"
      ),
  },
  {
    path: "/admin-dashboard",
    name: "adminDashboard",
    component: () =>
      import(
        /* webpackChunkName: "adminDashboard" */ "../views/AdminDashboard.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
