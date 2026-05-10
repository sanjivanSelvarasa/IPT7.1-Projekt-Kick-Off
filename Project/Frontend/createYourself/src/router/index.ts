import { createRouter, createWebHistory } from 'vue-router'
import Landingpage from "@/pages/Landingpage.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Editor from "@/pages/Editor.vue";
import Public from "@/pages/Public.vue";
import Theme from "@/pages/Theme.vue";
import Login from "@/pages/auth/Login.vue";
import Register from "@/pages/auth/Register.vue";
import {useAuthStore} from "@/stores/authStore.ts";
import Profile from "@/pages/Profile.vue";
import Settings from "@/pages/Settings.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Landingpage',
      component: Landingpage,
      meta: { requiresAuth: false },
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: { requiresAuth: true },
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: { requiresAuth: true },
    },
    {
      path: '/editor',
      name: 'Editor',
      component: Editor,
      meta: { requiresAuth: true },
    },
    {
      path: '/public',
      name: 'public',
      component: Public,
      meta: { requiresAuth: false },
    },
    {
      path: '/theme',
      name: 'Theme',
      component: Theme,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false },
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { requiresAuth: false },
    }
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if(to.meta.requiresAuth && localStorage.getItem('token') === null) {
    return '/login'
  }
})

export default router
