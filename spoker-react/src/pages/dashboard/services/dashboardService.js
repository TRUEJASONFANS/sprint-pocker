import * as request from '../../../utils/request';
import { DASHBOARD_PAGE_SIZE } from '../../constants';

export function fetch(page) {
  return request(`/api/dashboard?page=${page}&_limit=${DASHBOARD_PAGE_SIZE}`, {
    method:'get'
  });
}


export function create(newItem) {
  return request(`/api/dashboard`, {
    method:'post',
    body: JSON.stringify(newItem),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export function remove(ticketNum) {
  return request(`/api/dashboard/${ticketNum}`, {
    method:'delete',
  });
}