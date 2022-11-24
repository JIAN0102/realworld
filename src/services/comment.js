import { request } from './index';

export function getComments(slug) {
  return request({
    method: 'GET',
    url: `/articles/${slug}/comments`,
  });
}

export function createComment(slug, content) {
  return request({
    method: 'POST',
    url: `/articles/${slug}/comments`,
    data: {
      comment: {
        body: content,
      },
    },
  });
}

export function deleteComment(slug, id) {
  return request({
    method: 'DELETE',
    url: `/articles/${slug}/comments/${id}`,
  });
}
