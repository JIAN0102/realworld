import { request } from './index';

export function getArticles(params) {
  return request({
    method: 'GET',
    url: '/articles',
    params,
  });
}

export function getArticlesByFeed(params) {
  return request({
    method: 'GET',
    url: '/articles/feed',
    params,
  });
}

export function createArticleFavorite(slug) {
  return request({
    method: 'POST',
    url: `/articles/${slug}/favorite`,
  });
}

export function deleteArticleFavorite(slug) {
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

export function createArticle(article) {
  return request({
    method: 'POST',
    url: '/articles',
    data: {
      article,
    },
  });
}

export function updateArticle(slug, article) {
  return request({
    method: 'PUT',
    url: `/articles/${slug}`,
    data: {
      article,
    },
  });
}

export function deleteArticle(slug) {
  return request({
    method: 'DELETE',
    url: `/articles/${slug}`,
  });
}
