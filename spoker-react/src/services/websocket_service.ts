import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {hostUrl} from '../constans';

let stompClient;
let socket;

// export function onLoginServer(userName) {
//   console.log('onLoginServer', userName);
//   stompClient.send("/app/login", {}, userName);
  
// }

export function openSocket(subscribeUrl, subs_action:Function, instant_call:Function) {
  // 连接 Websocket 服务端 
  // 生成cookie
  if (socket === undefined) {
    socket = new SockJS(`${hostUrl}/pocker-websocket`);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      subscribe(subscribeUrl, subs_action);
      instant_call();
    });
  } else {
    subscribe(subscribeUrl, subs_action);
    instant_call();
  }

}

export function subscribe(subscribeUrl, action) {
  console.log('request url', subscribeUrl);
  stompClient.subscribe(subscribeUrl, action);
}

export function request(sendUrl, header, body) {
  console.log('request url:', sendUrl);
  console.log('body:', body);
  stompClient.send(sendUrl, header, body);
}