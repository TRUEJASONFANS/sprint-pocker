import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient;
let socket;

export function onLoginServer(userName) {
  console.log('onLoginServer', userName);
  stompClient.send("/app/login", {}, userName);
  
}

export function openSocket(action) {
  // 连接 Websocket 服务端 
  // 生成cookie
  socket = new SockJS("http://localhost:8080/pocker-websocket");
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame) {
    stompClient.subscribe('/pocker/login', function (data) {
      console.log('login sucessful!' + JSON.parse(data.body));
      if (data.body) {
        action(JSON.parse(data.body))
      }
    });
  });

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