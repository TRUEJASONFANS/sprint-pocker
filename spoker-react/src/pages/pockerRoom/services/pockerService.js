import { subscribe, request } from '../../../services/websocket_service';
export function fetch(action, roomId) {
  subscribe('/pocker/pockerBoard/' + roomId, action);
  request('/app/joinPockerBoard/' + roomId, {}, {});
}

export function onClickPocker(values) {
  console.log('xxxx', values.roomName)
  request('/app/onClickPocker/'+ values.roomName, {}, JSON.stringify(values));
}
