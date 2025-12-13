import { createRouter, createWebHashHistory } from "vue-router"; // SPA use hash history
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
    meta: { requiresAuth: true, role: "pemeriksa" },
  },
  {
    path: "/pejabat",
    name: "pejabatDashboard",
    component: PejabatDashboard,
    meta: { requiresAuth: true, role: "struktural" },
  },
  {
    path: "/admin",
    name: "adminDashboard",
    component: AdminDashboard,
    meta: { requiresAuth: true, role: "admin" },
  },
];

const router = createRouter({
  // history: createWebHashHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes,
});

// Bagian ini memastikan jika belum login, user akan diarahkan ke halaman home
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiredRole = to.meta.role;
  const isAuthenticated = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (requiresAuth && !isAuthenticated) {
    // If the route requires authentication and the user is not logged in, redirect to home.
    return next({ name: "home" });
  }

  if (requiredRole) {
    if (!user || user.role !== requiredRole) {
      // If the route requires a specific role and the user does not have it, redirect to home.
      // Admins are not automatically granted access to other roles' pages with this logic.
      return next({ name: "home" });
    }
  }

  next();
});

export default router;
