import { request } from '@/utils/request';// Note: use the {} if the export file don't use the default
import { DASHBOARD_PAGE_SIZE } from '@/constans';

export function fetch({ page = 1 }) {
  return request(`/dashboard?pageOffset=${page}&limit=${DASHBOARD_PAGE_SIZE}`);
}


export function create(newItem) {
  return request(`/dashboard`, {
    method: 'POST',
    body: JSON.stringify(newItem),
    headers: {
      'Content-Type': 'application/json'
    },
  });
}

export function deleteOne(ticketNum) {
  return request(`/dashboard/${ticketNum}`, {
    method: 'delete',
  });
}

export function update(values) {
  const id = values.id;
  return request(`/dashboard/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json'
    },
  });
}
