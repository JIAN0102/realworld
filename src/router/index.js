import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
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
      name: 'login',
      component: () => import('@/views/SettingsView.vue'),
    },
    {
      path: '/article/:slug',
      name: 'article',
      component: () => import('@/views/ArticleView.vue'),
    },
    {
      path: '/editor',
      name: 'article-create',
      component: () => import('@/views/ArticleCreateView.vue'),
    },
    {
      path: '/editor/:slug',
      name: 'article-edit',
      component: () => import('@/views/ArticleEditView.vue'),
    },
    {
      path: '/@:username/:tabId',
      name: 'article-edit',
      component: () => import('@/views/ProfileView.vue'),
    },
  ],
});

export default router;
