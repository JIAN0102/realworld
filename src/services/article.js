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

export function createArticleFavorite(slug) {
  return request.post(`/articles/${slug}/favorite`);
}

export function deleteArticleFavorite(slug) {
  return request.delete(`/articles/${slug}/favorite`);
}

export function getArticle(slug) {
  return request.get(`/articles/${slug}`);
}

export function createArticle(article) {
  return request.post('/articles', {
    article,
  });
}

export function editArticle(slug, article) {
  return request.put(`/articles/${slug}`, {
    article,
  });
}

export function deleteArticle(slug) {
  return request.delete(`/articles/${slug}`);
}
