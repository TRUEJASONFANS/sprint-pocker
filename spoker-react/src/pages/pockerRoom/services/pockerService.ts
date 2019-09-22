import { subscribe, request, openSocket} from '@/services/websocket_service';
import * as restAPI from '@/utils/request';
import { __values } from 'tslib';

export function fetch(action: Function, roomId:string, curPage:number) {
  // subscribe('/pocker/pockerBoard/' + roomId, action);
  // request('/app/joinPockerBoard/' + roomId, {}, {});
  openSocket('/pocker/pockerBoard/' + roomId , action, () => request('/app/joinPockerBoard/' + roomId + '/' + curPage, {}, {}));
}

export function onClickPocker(values) {
  request('/app/onClickPocker/'+ values.roomName + '/' + values.curPage, {}, JSON.stringify(values));
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

export function onNextGame(roomName:string) {
  request('/app/onNextGame/'+ roomName, {}, {});
}

interface Pageable {
  curPage: number,
  totalPage: number,
  roomName: string
}

export function AddStory(values: Pageable) {
  request('/app/onAddStory'+ values.roomName , {}, JSON.stringify(values));
}