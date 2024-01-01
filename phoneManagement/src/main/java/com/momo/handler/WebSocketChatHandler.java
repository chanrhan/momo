package com.momo.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebSocketChatHandler extends TextWebSocketHandler {
	private final ObjectMapper mapper;

	// chatRoomId : {session1, session2}
	private       Set<WebSocketSession>            sessions           = new HashSet<>();
	private final Map<Long, Set<WebSocketSession>> chatRoomSessionMap = new HashMap<>();

	@Override
	// 소켓 연결 확인
	public void afterConnectionEstablished(WebSocketSession session) throws Exception{
		super.afterConnectionEstablished(session);
		sessions.add(session);
	}

	@Override
	// 소켓 통신 시 메세지의 전송을 다루는 부분
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {

	}


//	private void sendMessageToChatRoom(ChatMessageDTO chatMessageDTO, Set<WebSocketSession> chatRoomSesion){
//		chatRoomSesion.parallelStream().forEach(session -> sendMessage(session, chatMessageDTO));
//	}
//
//	private <T> void sendMessage(WebSocketSession session, T message){
//		try{
//			session.sendMessage(new TextMessage(mapper.writeValueAsString(message)));
//		}catch (IOException e){
//			log.error(e.getMessage());
//		}
//	}
}
