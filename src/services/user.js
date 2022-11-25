import { request } from './index';

export function login(data) {
  return request({
    method: 'POST',
    url: '/users/login',
    data,
  });
}

export function register(data) {
  return request({
    method: 'POST',
    url: '/users',
    data,
  });
}

export function getUser() {
  return request({
    method: 'GET',
    url: '/user',
  });
}

export function updateUser(data) {
  return request({
    method: 'PUT',
    url: '/user',
    data,
  });
}
