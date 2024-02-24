package com.momo.config;

import com.momo.handler.WebSocketAlarmHandler;
import com.momo.interceptor.CustomHandshakeInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

//@Configuration
//@EnableWebSocket
@RequiredArgsConstructor
@Deprecated
public class WebSocketConfig implements WebSocketConfigurer  {
	private final WebSocketAlarmHandler webSocketAlarmHandler;

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
//		registry.addHandler(webSocketAlarmHandler, "/ws")
//				.addInterceptors(new HttpSessionHandshakeInterceptor())
////				.addInterceptors( new CustomHandshakeInterceptor())
//				.setAllowedOrigins("*");
	}






}
