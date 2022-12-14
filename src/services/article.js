import { request } from './index';

export function getArticles({ type, params }) {
  return request({
    method: 'GET',
    url: `/articles${type === 'my-feed' ? '/feed' : ''}`,
    params,
  });
}

export function favoriteArticle(slug) {
  return request({
    method: 'POST',
    url: `/articles/${slug}/favorite`,
  });
}

export function unfavoriteArticle(slug) {
  return request({
    method: 'DELETE',
    url: `/articles/${slug}/favorite`,
  });
}

export function getArticle(slug) {
  return request({
    method: 'GET',
    url: `/articles/${slug}`,
  });
}

export function createArticle(data) {
  return request({
    method: 'POST',
    url: '/articles',
    data,
  });
}

export function updateArticle(slug, data) {
  return request({
    method: 'PUT',
    url: `/articles/${slug}`,
    data,
  });
}

export function deleteArticle(slug) {
  return request({
    method: 'DELETE',
    url: `/articles/${slug}`,
  });
}
