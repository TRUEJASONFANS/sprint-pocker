package org.zhxie.sprintpoker.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.zhxie.sprintpoker.entity.Room;
import org.zhxie.sprintpoker.repository.SocketSessionRegistry;

import java.util.List;


@Slf4j
@Component
public class WebSocketDisconnectListener implements ApplicationListener<SessionDisconnectEvent> {

  @Autowired
  private SimpMessagingTemplate template;

  @Autowired
  private SocketSessionRegistry socketSessionRegistry;

  @Override
  public void onApplicationEvent(SessionDisconnectEvent event) {
    String sessionId= event.getSessionId();
    log.info("session id:{}", sessionId);
  }
}
