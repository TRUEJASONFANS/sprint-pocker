//package org.zhxie.sprintpoker.config.interceptors;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.server.ServerHttpRequest;
//import org.springframework.http.server.ServerHttpResponse;
//import org.springframework.http.server.ServletServerHttpRequest;
//import org.springframework.web.socket.WebSocketHandler;
//import org.springframework.web.socket.server.HandshakeInterceptor;
//import org.zhxie.sprintpoker.repository.SocketSessionRegistry;
//
//import java.security.Principal;
//import java.util.Map;
//
//public class HttpHandshakeInterceptor implements HandshakeInterceptor {
//
//  @Autowired
//  private SocketSessionRegistry socketSessionRegistry;
//
//  @Override
//  public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
//                                 Map<String, Object> attributes) throws Exception {
//    if (request instanceof ServletServerHttpRequest) {
//      ServletServerHttpRequest servletRequest = (ServletServerHttpRequest) request;
//      final Principal principal = servletRequest.getPrincipal();
////      HttpSession session = servletRequest.getServletRequest().getSession(false);
////      String sessionId = session.getId();
////      socketSessionRegistry.registerSessionId(principal.getName(), sessionId);
//    }
//    return true;
//  }
//
//  @Override
//  public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
//                             Exception exception) {
//
//  }
//
//
//}
