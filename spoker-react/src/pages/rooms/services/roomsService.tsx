// import {request} from '../../../utils/request';
import {openSocket, request} from '@/services/websocket_service';

// export function fetch({ page = 1 }) {
//   // ` `字符串模版
//   return request(`/api/rooms=${page}&_limit=${PAGE_SIZE}`);
// }

// export function create(values) {
//   request('/api/addRoom',
//     // JSON.stringify(values)
//     {}
//   );
// }

export function create(values) {
  console.log("Room create ", values);
  request('/app/addRoom', {},	 
    JSON.stringify(values)
  );
}

export function w_connect(action) {
  openSocket('/pocker/rooms', action, w_request);
}

export function w_request() {
  request('/app/rooms', {}, {});
}
