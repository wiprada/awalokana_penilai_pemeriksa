import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AdminDashboard from "../views/AdminDashboard.vue";
import PejabatDashboard from "../views/PejabatDashboard.vue";
import UserDashboard from "../views/UserDashboard.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/user",
    name: "userDashboard",
    component: UserDashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/pejabat",
    name: "pejabatDashboard",
    component: PejabatDashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin",
    name: "adminDashboard",
    component: AdminDashboard,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Bagian ini memastikan jika belum login, user akan diarahkan ke halaman home
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  // This is a simplified check. You should use your actual authentication state.
  const isAuthenticated = localStorage.getItem("user");

  if (requiresAuth && !isAuthenticated) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
