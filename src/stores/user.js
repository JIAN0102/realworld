import { defineStore } from 'pinia';
import storage from '@/utils/storage';
import { getUser } from '@/services/user';

const userStorage = storage('user');

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null,
  }),
  getters: {
    isLoggedIn() {
      return !!this.currentUser;
    },
  },
  actions: {
    setUser(user) {
      this.currentUser = user;
      userStorage.set(user.token);
    },
    removeUser() {
      this.currentUser = null;
      userStorage.remove();
    },
    async verifyAuth() {
      if (!this.currentUser && userStorage.get()) {
        const res = await getUser();
        this.setUser(res.data.user);
      }
    },
  },
});
