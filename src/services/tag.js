import { request } from './index';

export function getTags() {
  return request({
    method: 'GET',
    url: '/tags',
  });
}
