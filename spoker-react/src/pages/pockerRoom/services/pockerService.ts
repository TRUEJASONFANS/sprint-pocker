import { subscribe, request as websocketRequest, openSocket} from '@/services/websocket_service';
import * as restAPI from '@/utils/request';

export function fetch(action: Function, roomId:string, curPage:number) {
  openSocket('/pokerBoard/' + roomId , action, () => websocketRequest('/joinPockerBoard/' + roomId + '/' + curPage, {},{}));
}

export function onClickPocker(values) {
  websocketRequest('/onClickPocker/'+ values.roomName + '/' + values.curPage, {}, JSON.stringify(values));
}

export function addTikcetRecord(ticketRecord) {
  console.log('tag', JSON.stringify(ticketRecord));
  restAPI.request('/dashboard', {
    method: 'POST',
    body:JSON.stringify(ticketRecord),
    headers: {
      'Content-Type': 'application/json'
    },
  });
}

export function generateInviteLink(roomName) {
  return restAPI.request('/room/token/' + roomName, {
    method: 'POST',
    body:JSON.stringify({name: roomName}),
    headers: {
      'Content-Type': 'application/json'
    },
  });
}

export function onNextGame(values: Pageable) {
  websocketRequest('/onNextGame/'+ values.roomName + '/' + values.curPage, {}, {});
}

export interface Pageable {
  curPage: number,
  totalPage: number,
  roomName: string,
  title?:string
}

export function addStory(values: Pageable) {
  websocketRequest('/onAddStory/'+ values.roomName , {}, JSON.stringify(values));
} 

export function onNavigateToPage(values: Pageable) {
  websocketRequest('/onNavigateToPage/'+ values.roomName , {}, JSON.stringify(values));
}

export interface FinalCandidate {
  pageNum: number,
  roomName: string,
  score : string,
}
export function OnSelectCandidate(values: FinalCandidate) {
  websocketRequest('/onSelectCandidate/'+ values.roomName, {}, JSON.stringify(values));
}
