import { subscribe, request } from '../../../services/websocket_service';
export function fetch(action, roomId) {
  subscribe('/pocker/pockerBoard/' + roomId, action)
  request('/app/joinPockerBoard/' + roomId, {}, {});
}

