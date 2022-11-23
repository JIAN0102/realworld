import { defineStore } from 'pinia';
import storage from '@/utils/storage';

const userStorage = storage('user');

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null,
    isAuthorized: !!userStorage.get(),
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
        this.isAuthorized = true;
        userStorage.set(token);
      } else {
        this.isAuthorized = false;
        userStorage.remove();
      }
    },
  },
});
