import { request } from './index';

export function getArticles(params) {
  return request.get('/articles', {
    params,
  });
}

export function getArticlesByFeed(params) {
  return request.get('/articles/feed', {
    params,
  });
}

export function getArticle(slug) {
  return request.get(`/articles/${slug}`);
}

export function createArticleFavorite(slug) {
  return request.post(`/articles/${slug}/favorite`);
}

export function deleteArticleFavorite(slug) {
  return request.delete(`/articles/${slug}/favorite`);
}
