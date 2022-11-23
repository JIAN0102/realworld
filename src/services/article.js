import { request } from './index';

export function fetchArticles(params) {
  return request.get('/articles', {
    params,
  });
}

export function fetchArticlesByFeed(params) {
  return request.get('/articles/feed', {
    params,
  });
}
