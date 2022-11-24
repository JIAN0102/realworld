import { request } from './index';

export function login(user) {
  return request.post('/users/login', {
    user,
  });
}

export function register(user) {
  return request.post('/users', {
    user,
  });
}

export function getUser() {
  return request.get('/user');
}

export function updateUser(user) {
  return request.put('/user', {
    user,
  });
}
