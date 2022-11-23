import { createRouter, createWebHistory } from 'vue-router';
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
    },
    {
      path: '/editor/:slug',
      name: 'edit-article',
      component: () => import('@/views/ArticleEditView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingsView.vue'),
    },
    {
      path: '/profile/:username',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
    },
    {
      path: '/profile/:username/favorites',
      name: 'profile-favorites',
      component: () => import('@/views/ProfileView.vue'),
    },
  ],
});

export default router;
