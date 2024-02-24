package com.momo.controller;

import com.momo.config.HttpSessionConfigurater;
import jakarta.websocket.server.ServerEndpoint;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.util.HtmlUtils;

//@RestController
@RequiredArgsConstructor
@Deprecated
public class WebSocketController {
	@EventListener
	public void handleWebSocketConnectListener(SessionConnectEvent event){
		System.out.println("WebSocket Connect: "+event);
	}

	@EventListener
	public void handleWebSocketDisconnectListener(SessionDisconnectEvent event){
		System.out.println("WebSocket Disconnect: "+event);
		StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
		String sessionId = headerAccessor.getSessionId();


	}

	@MessageMapping("/hello")
	@SendTo("/sub/greeting")
	public String greeting(String msg) throws Exception{
		System.out.println("Hello");
		Thread.sleep(1000);
		System.out.println(msg);
		return "Hello, " + HtmlUtils.htmlEscape(msg) + "!";
	}
}
