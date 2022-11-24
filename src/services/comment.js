import { request } from './index';

export function getComments(slug) {
  return request.get(`/articles/${slug}/comments`);
}

export function createComment(slug, content) {
  return request.post(`/articles/${slug}/comments`, {
    comment: {
      body: content,
    },
  });
}

export function deleteComment(slug, id) {
  return request.delete(`/articles/${slug}/comments/${id}`);
}
