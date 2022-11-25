import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { useUserStore } from '@/stores/user';

const app = createApp(App);

app.use(createPinia());
app.use(router);

(async () => {
  const userStore = useUserStore();
  await userStore.verifyAuth();
  app.mount('#app');
})();
