import { request } from './index';

export function login(user) {
  return request({
    method: 'POST',
    url: '/users/login',
    data: {
      user,
    },
  });
}

export function register(user) {
  return request({
    method: 'POST',
    url: '/users',
    data: {
      user,
    },
  });
}

export function getUser() {
  return request({
    method: 'GET',
    url: '/user',
  });
}

export function updateUser(user) {
  return request({
    method: 'PUT',
    url: '/user',
    data: {
      user,
    },
  });
}
