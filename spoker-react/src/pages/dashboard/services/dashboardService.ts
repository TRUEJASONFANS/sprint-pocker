import { request } from '@/utils/request';// Note: use the {} if the export file don't use the default
import { DASHBOARD_PAGE_SIZE } from '@/pages/constants';
import Item from 'antd-mobile/lib/popover/Item';

export function fetch({ page = 1 }) {
  return request(`/api/dashboard?pageOffset=${page}&limit=${DASHBOARD_PAGE_SIZE}`);
}


export function create(newItem) {
  return request(`/api/dashboard`, {
    method: 'POST',
    body: JSON.stringify(newItem),
    headers: {
      'Content-Type': 'application/json'
    },
  });
}

export function deleteOne(ticketNum) {
  return request(`/api/dashboard/${ticketNum}`, {
    method: 'delete',
  });
}

export function update(values) {
  const id = values.id;
  return request(`/api/dashboard/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json'
    },
  });
}
