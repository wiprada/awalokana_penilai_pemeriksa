import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/AdminView.vue'
import UserView from '../views/UserView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: LoginView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/user',
    name: 'user',
    component: UserView,
    meta: { requiresAuth: true }
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, _, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  const userRole = localStorage.getItem('userRole'); // Assuming you store user role in localStorage

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'home' });
    } else if (to.matched.some(record => record.meta.requiresAdmin) && userRole !== 'admin') {
      next({ name: 'user' }); // Redirect non-admin users to user view
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
