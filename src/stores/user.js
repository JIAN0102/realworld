import { defineStore } from 'pinia';
import storage from '@/utils/storage';
import { fetchCurrentUser } from '@/services/user';

const userStorage = storage('user');

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null,
    isAuthenticated: !!userStorage.get(),
  }),
  actions: {
    setFromUser(user) {
      this.setCurrentUser(user);
      this.setAuthToken(user.token);
    },
    setCurrentUser(user) {
      this.currentUser = user;
    },
    setAuthToken(token) {
      if (token) {
        this.isAuthenticated = true;
        userStorage.set(token);
      } else {
        this.isAuthenticated = false;
        userStorage.remove();
      }
    },
    async checkAuth() {
      if (this.isAuthenticated) {
        const res = await fetchCurrentUser();
        this.setFromUser(res.data.user);
      }
    },
  },
});
