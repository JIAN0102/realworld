import { defineStore } from 'pinia';
import storage from '@/utils/storage';
import { getUser } from '@/services/user';

const userStorage = storage('user');

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null,
    isAuthenticated: !!userStorage.get(),
  }),
  actions: {
    setUser(user) {
      this.setCurrentUser(user);
      this.setAuthToken(user.token);
    },
    removeUser() {
      this.setCurrentUser(null);
      this.setAuthToken(null);
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
    async verifyAuth() {
      if (!this.currentUser && this.isAuthenticated) {
        const res = await getUser();
        this.setUser(res.data.user);
      }
    },
  },
});
