package org.zhxie.sprintpoker.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.zhxie.sprintpoker.repository.SocketSessionRegistry;

/**
 * Created by zhxie on 11/16/2018.
 */

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {


    public static final String WEBSOCKET_SERVER_LISTNER = "/sprint/ws/listener";

    public static final String WEBSOCKET_SERVER_SUBSCRIBER = "/sprint/ws/subscriber";

    /**
     * Configure message broker options.
     * <p>
     * config
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {

        // carry the message back to the client on destinations prefixed with "/poker"
        //设置简单的消息代理器，它使用Memory（内存）作为消息代理器，
        //其中/pocker都是我们发送到前台的数据前缀。前端必须订阅以/pocker开始的消息（.subscribe()进行监听）。
        //setHeartbeatValue设置后台向前台发送的心跳，
        //注意：setHeartbeatValue这个不能单独设置，不然不起作用，要配合后面setTaskScheduler才可以生效。
        //对应的解决方法的网址：https://stackoverflow.com/questions/39220647/spring-stomp-over-websockets-not-scheduling-heartbeats
        ThreadPoolTaskScheduler te = new ThreadPoolTaskScheduler();
        te.setPoolSize(1);
        te.setThreadNamePrefix("wss-heartbeat-thread-");
        te.initialize();

        //simple broker,  the url where websocket clinet to send the meesg
        //destination prefix is where the url to client to subscribe/
        config.enableSimpleBroker(WEBSOCKET_SERVER_SUBSCRIBER).setHeartbeatValue(new long[]{20000, 20000}).setTaskScheduler(te);

        // designate the "/Listener" prefix for messages bound for @MessageMapping
        config.setApplicationDestinationPrefixes(WEBSOCKET_SERVER_LISTNER);
    }

    /**
     * Register STOMP endpoints mapping each to a specific URL and (optionally)
     * enabling and configuring SockJS fallback options.
     *
     * @param config
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry config) {
        config.addEndpoint("/sprint/ws").setAllowedOrigins("*")
                .withSockJS();
    }


    @Bean
    public SocketSessionRegistry SocketSessionRegistry() {
        return new SocketSessionRegistry();
    }

}
