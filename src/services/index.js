import axios from 'axios';
import storage from '@/utils/storage';
import { CONFIG } from '@/config';

export function pageToOffset(page = 1, limit = 10) {
  const offset = (page - 1) * limit;
  return {
    limit,
    offset,
  };
}

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
