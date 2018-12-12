import { PAGE_SIZE } from '../constants';
import {subscribe, request} from '../../../services/websocket_service';

export function fetch(action) {
  subscribe('/pocker/rooms', action)
  request('/app/rooms', {}, {});
}


export function remove(id) {
  return request(`/api/users/${id}`, {
    method: 'DELETE',
  });
}

export function patch(id, values) {
  return request(`/api/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}

export function create(values) {
  request('/app/addRoom', {},
    JSON.stringify(values),
  );
}
