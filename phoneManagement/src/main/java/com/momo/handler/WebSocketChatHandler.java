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

		AlarmVO alarm = objectMapper.readValue(payload, AlarmVO.class);
		System.out.println(alarm);

		if(alarm.getSenderId() == null || alarm.getReceiverId() == null){
			return;
		}

		int result = alarmService.insertAlarm(alarm);
		if(result == 0){
			return;
		}
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {

	}
}
