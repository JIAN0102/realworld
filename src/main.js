import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { useUserStore } from '@/stores/user';

const app = createApp(App);

(async () => {
  app.use(createPinia());

  const userStore = useUserStore();
  await userStore.verifyAuth();

  app.use(router);
  app.mount('#app');
})();
