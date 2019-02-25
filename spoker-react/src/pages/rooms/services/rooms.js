import { PAGE_SIZE } from '../constants';
import {request} from '../../../utils/request';

export function fetch({ page = 1 }) {
  // ` `字符串模版
  return request(`/api/rooms=${page}&_limit=${PAGE_SIZE}`);
}

export function create(values) {
  request('/api/addRoom',
    // JSON.stringify(values)
    {}
  );
}
