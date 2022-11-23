import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'global-feed',
      component: HomeView,
    },
    {
      path: '/my-feeds',
      name: 'my-feed',
      component: HomeView,
    },
    {
      path: '/tag/:tag',
      name: 'tag',
      component: HomeView,
    },
    {
      path: '/article/:slug',
      name: 'article',
      component: () => import('@/views/ArticleView.vue'),
    },
    {
      path: '/editor',
      name: 'create-article',
      component: () => import('@/views/ArticleCreateView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/editor/:slug',
      name: 'edit-article',
      component: () => import('@/views/ArticleEditView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
      meta: {
        anonymousOnly: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: {
        anonymousOnly: true,
      },
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingsView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/profile/:username',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/profile/:username/favorites',
      name: 'profile-favorites',
      component: () => import('@/views/ProfileView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to) => {
  const userStore = useUserStore();
  const { isAuthenticated } = userStore;
  if (to.meta.requiresAuth && !isAuthenticated) {
    return {
      name: 'login',
      query: {
        redirect: to.fullPath,
      },
    };
  }
  if (to.meta.anonymousOnly && isAuthenticated) {
    return;
  }
});

export default router;
