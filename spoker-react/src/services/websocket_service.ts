import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {hostUrl} from '../constans';


var stompClient;
var socket;

/**
 * Sockjs with Stomp is a polyfill for moden browser for websocket protocal implementation
 * @param subscribeUrl
 * @param subs_action
 * @param instant_call
 */
export function openSocket(subscribeUrl, subs_action: Function, instant_call: Function) {
  // 连接 Websocket 服务端
  // 生成cookie
  if (socket === undefined) {
    socket = new SockJS(`${hostUrl}/sprint/ws`);
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
  sendUrl = '/sprint/ws/listener' + sendUrl;
  stompClient.send(sendUrl, header, body);
}

