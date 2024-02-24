package com.momo.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.momo.config.HttpSessionConfigurater;
import com.momo.service.AlarmService;
import com.momo.service.ShopCommonService;
import com.momo.util.SecurityContextUtil;
import com.momo.vo.AlarmVO;
import jakarta.servlet.http.HttpSession;
import jakarta.websocket.server.ServerEndpoint;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Slf4j
@RequiredArgsConstructor
//@Component
//@ServerEndpoint(value = "/ws", configurator = HttpSessionConfigurater.class)
@Deprecated
public class WebSocketAlarmHandler extends TextWebSocketHandler {
	private final ObjectMapper objectMapper = new ObjectMapper();
	private final AlarmService alarmService;
	private final ShopCommonService shopCommonService;

	private Set<WebSocketSession>        sessions       = new HashSet<>();
	private Map<String,WebSocketSession> userSessionMap = new HashMap<>();

	@Override
	// 소켓 연결 확인
	public void afterConnectionEstablished(WebSocketSession session) throws Exception{
		super.afterConnectionEstablished(session);
		System.out.println("[qq] WebSocket after Conn");

		System.out.println("session attributes: "+session.getAttributes());


		sessions.add(session);
	}

	@Override
	// 소켓 통신 시 메세지의 전송을 다루는 부분
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		String payload = message.getPayload();

		AlarmVO vo = objectMapper.readValue(payload, AlarmVO.class);
//		System.out.println(vo);

		if(vo.getSenderId() == null){
			return;
		}

		if(vo.getReceiverId() == null){
			vo.setReceiverId("admin");
		}

//		Map<String,Object> corp = shopCommonService.selectCorpById(vo.getCorpId());
//		vo.setReceiverId(corp.get("reps_id").toString());

		int result = alarmService.insertAlarm(vo);
		if(result == 0){
			return;
		}

		sendAlarmTo(vo);
	}

	private void sendAlarmTo(AlarmVO vo){
		String receiverId = vo.getReceiverId();

		WebSocketSession session = userSessionMap.get(receiverId);
		sendMessage(session, vo);
	}

	private void sendAlarmToAllSession(AlarmVO vo){
		for(WebSocketSession session : sessions){
			sendMessage(session, vo);
		}
	}

	private <T> void sendMessage(WebSocketSession session, T message){
		try{
			session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
		}catch (IOException e){
			log.error(e.getMessage());
		}
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessions.remove(session);
	}
}
