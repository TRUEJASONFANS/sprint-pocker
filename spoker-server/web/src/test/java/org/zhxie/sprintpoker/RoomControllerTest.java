package org.zhxie.sprintpoker;

import com.google.common.collect.Sets;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.zhxie.sprintpoker.repository.SocketSessionRegistry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.*;
import org.springframework.messaging.tcp.TcpConnection;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.socket.WebSocketHttpHeaders;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.Transport;
import org.springframework.web.socket.sockjs.client.WebSocketClientSockJsSession;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

import java.lang.reflect.Field;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class RoomControllerTest {

  @LocalServerPort
  private int port;

  private SockJsClient sockJsClient;

  private WebSocketStompClient stompClient;

  private final WebSocketHttpHeaders headers = new WebSocketHttpHeaders();

  @Autowired
  private SocketSessionRegistry socketSessionRegistry;

  @Before
  public void setup() {
    List<Transport> transports = new ArrayList<>();
    transports.add(new WebSocketTransport(new StandardWebSocketClient()));
    this.sockJsClient = new SockJsClient(transports);

    this.stompClient = new WebSocketStompClient(sockJsClient);
    this.stompClient.setMessageConverter(new MappingJackson2MessageConverter());
  }

  @Test
  public void testJoinPockerBoardByRoomId() throws InterruptedException {

    final CountDownLatch latch = new CountDownLatch(1);
    final AtomicReference<Throwable> failure = new AtomicReference<>();

    StompSessionHandler handler = new org.zhxie.sprintpoker.LoginingIntegrationTests.TestSessionHandler(failure) {

      @Override
      public void afterConnected(final StompSession session, StompHeaders connectedHeaders) {
        session.subscribe("/pocker/pockerBoard/room1", new StompFrameHandler() {
          @Override
          public Type getPayloadType(StompHeaders headers) {
            return List.class;
          }

          @Override
          public void handleFrame(StompHeaders headers, Object payload) {
            List<Map> players = (List<Map>) payload;
            try {
              assertTrue(players.get(0).get("name").equals("jason"));
              assertTrue(players.get(0).get("fibonacciNum").equals("??"));
            } catch (Throwable t) {
              failure.set(t);
            } finally {
              session.disconnect();
              latch.countDown();
            }
          }
        });

        DefaultStompSession defaultStompSession =
                (DefaultStompSession) session;
        Field fieldConnection = ReflectionUtils.findField(DefaultStompSession.class, "connection");
        fieldConnection.setAccessible(true);

        String sockjsSessionId = "";
        try {
          TcpConnection<byte[]> connection = (TcpConnection<byte[]>) fieldConnection.get(defaultStompSession);
          try {
            Class adapter = Class.forName("org.springframework.web.socket.messaging.WebSocketStompClient$WebSocketTcpConnectionHandlerAdapter");
            Field fieldSession = ReflectionUtils.findField(adapter, "session");
            fieldSession.setAccessible(true);
            WebSocketClientSockJsSession sockjsSession = (WebSocketClientSockJsSession) fieldSession.get(connection);
            sockjsSessionId = sockjsSession.getId(); // gotcha!
          } catch (ClassNotFoundException e) {
            e.printStackTrace();
          }
        } catch (IllegalAccessException e) {
          e.printStackTrace();
        }

        socketSessionRegistry.getAllSessionIds().put("jason", Sets.newHashSet(sockjsSessionId));

        try {
          session.send("/app/joinPockerBoard/room1", null);
        } catch (Throwable t) {
          failure.set(t);
          latch.countDown();
        }
      }
    };
    this.stompClient.connect("ws://localhost:{port}/pocker-websocket", this.headers, handler, this.port);

    if (latch.await(10, TimeUnit.SECONDS)) {
      if (failure.get() != null) {
        throw new AssertionError("", failure.get());
      }
    }
    else {
      fail("Join fail");
    }
  }
}
