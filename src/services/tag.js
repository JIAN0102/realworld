import { request } from './index';

export function getTags() {
  return request.get('/tags');
}
