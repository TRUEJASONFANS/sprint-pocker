import { subscribe, request } from '../../../services/websocket_service';
import * as restAPI from '../../../utils/request';

export function fetch(action, roomId) {
  subscribe('/pocker/pockerBoard/' + roomId, action);
  request('/app/joinPockerBoard/' + roomId, {}, {});
}

export function onClickPocker(values) {
  console.log('xxxx', values.roomName)
  request('/app/onClickPocker/'+ values.roomName, {}, JSON.stringify(values));
}

export function addTikcetRecord(ticketRecord) {
  console.log('tag', JSON.stringify(ticketRecord));
  restAPI.request('/poker/ticketRecord', {
    method: 'POST',
    body:JSON.stringify(ticketRecord)
  });
}