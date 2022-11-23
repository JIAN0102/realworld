import { request } from './index';

export function login({ email, password }) {
  return request.post('/users/login', {
    user: {
      email,
      password,
    },
  });
}

export function register({ username, email, password }) {
  return request.post('/users', {
    user: {
      username,
      email,
      password,
    },
  });
}

export function fetchCurrentUser() {
  return request.get('/user');
}
