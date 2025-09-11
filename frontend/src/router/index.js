import { createRouter, createWebHistory } from 'vue-router'
// import Vue from 'vue'
// import Router from 'vue-router'
import LandingView from '../views/LandingView.vue'

// import LoginView from '../views/LoginView.vue'
// import ExaminerView from '../views/ExaminerView.vue'
// import SupervisorView from '../views/SupervisorView.vue'

// Vue.use(Router)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: LandingView
    }
  ]
})

// const routes = [
//   {
//     path: '/',
//     name: 'Landing',
//     component: LandingView
//   }
// ]


// const routes = [
//   {
//     path: '/',
//     name: 'Login',
//     component: LoginView
//   },
//   {
//     path: '/examiner',
//     name: 'Examiner',
//     component: ExaminerView,
//     meta: { requiresAuth: true, role: 'pemeriksa' }
//   },
//   {
//     path: '/supervisor',
//     name: 'Supervisor',
//     component: SupervisorView,
//     meta: { requiresAuth: true, role: 'atasan' }
//   }
// ]

// const router = new Router({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = false; // Replace with actual authentication check
//   const userRole = ''; // Replace with actual user role

//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!isAuthenticated) {
//       next({ name: 'Login' });
//     } else if (to.meta.role && to.meta.role !== userRole) {
//       next({ name: 'Login' });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// })

export default router;