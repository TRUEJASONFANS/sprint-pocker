import {request} from '../../../utils/request';// Note: use the {} if the export file don't use the default
import { DASHBOARD_PAGE_SIZE } from '../../constants';

export function fetch({page=1}) {
  return request(`/api/dashboard?page=${page}&limit=${DASHBOARD_PAGE_SIZE}`);
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