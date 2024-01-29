package com.momo.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.momo.service.AlarmService;
import com.momo.vo.AlarmVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebSocketChatHandler extends TextWebSocketHandler {
	private final ObjectMapper objectMapper;
	private final AlarmService alarmService;

	private       Set<WebSocketSession>            sessions           = new HashSet<>();

	@Override
	// 소켓 연결 확인
	public void afterConnectionEstablished(WebSocketSession session) throws Exception{
		super.afterConnectionEstablished(session);
		sessions.add(session);
	}

	@Override
	// 소켓 통신 시 메세지의 전송을 다루는 부분
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		String payload = message.getPayload();

		Map<String,Object> alarmMap = objectMapper.readValue(payload, Map.class);
		System.out.println(alarmMap);

		if(alarmMap.get("sender_id") == null || alarmMap.get("receiver_id") == null){
			return;
		}

		int result = alarmService.insert(alarmMap);
		if(result == 0){
			return;
		}
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
