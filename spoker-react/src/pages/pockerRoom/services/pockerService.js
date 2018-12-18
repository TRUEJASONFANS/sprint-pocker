import {subscribe, request} from '../../../services/websocket_service';
export function fetch(action) {
  subscribe('/pocker/ticketPockerStory', action)
  request('/app/ticketPockerStory', {}, {});
}

