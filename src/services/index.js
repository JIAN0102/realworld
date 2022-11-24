import axios from 'axios';
import storage from '@/utils/storage';
import { CONFIG } from '@/config';

export const request = axios.create({
  baseURL: `${CONFIG.API_HOST}/api`,
});

request.interceptors.request.use(
  (config) => {
    const userStorage = storage('user');
    const token = userStorage.get();
    if (token) {
      config.headers.Authorization = `Token ${token}`;
      return config;
    }
    delete config.headers.Authorization;
    return config;
  },
  (error) => Promise.reject(error)
);
