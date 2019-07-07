import { subscribe, request, openSocket} from '@/services/websocket_service';
import * as restAPI from '@/utils/request';

export function fetch(action, roomId) {
  // subscribe('/pocker/pockerBoard/' + roomId, action);
  // request('/app/joinPockerBoard/' + roomId, {}, {});
  openSocket('/pocker/pockerBoard/' + roomId, action, () => request('/app/joinPockerBoard/' + roomId, {}, {}));
}

export function onClickPocker(values) {
  console.log('xxxx', values.roomName)
  request('/app/onClickPocker/'+ values.roomName, {}, JSON.stringify(values));
}

export function addTikcetRecord(ticketRecord) {
  console.log('tag', JSON.stringify(ticketRecord));
  restAPI.request('/api/dashboard', {
    method: 'POST',
    body:JSON.stringify(ticketRecord),
    headers: {
      'Content-Type': 'application/json'
    },
  });
}
