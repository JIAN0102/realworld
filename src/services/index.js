import axios from 'axios';
import { CONFIG } from '@/config';

export const limit = 10;

export const request = axios.create({
  baseURL: `${CONFIG.API_HOST}/api`,
});

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);
