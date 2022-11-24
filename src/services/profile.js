import { request } from './index';

export function getProfile(username) {
  return request.get(`/profiles/${username}`);
}

export function followProfile(username) {
  return request.post(`/profiles/${username}/follow`);
}

export function unfollowProfile(username) {
  return request.delete(`/profiles/${username}/follow`);
}

export function deleteArticleFavorite(slug) {
  return request.delete(`/articles/${slug}/favorite`);
}
