import { request } from './index';

export function getProfile(username) {
  return request({
    method: 'GET',
    url: `/profiles/${username}`,
  });
}

export function followProfile(username) {
  return request({
    method: 'POST',
    url: `/profiles/${username}/follow`,
  });
}

export function unfollowProfile(username) {
  return request({
    method: 'DELETE',
    url: `/profiles/${username}/follow`,
  });
}
