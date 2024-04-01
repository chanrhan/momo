package com.momo.controller;

import com.momo.common.UserDetailsImpl;
import com.momo.common.enums.ChatResponseHeader;
import com.momo.service.ChatService;
import com.momo.service.NotificationService;
import com.momo.common.response.ChatResponse;
import com.momo.common.util.ResponseEntityUtil;
import com.momo.common.vo.ChatVO;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatController {
	private final SimpMessagingTemplate simpMessagingTemplate;
	private final ChatService         chatService;
	private final NotificationService notificationService;

	// 웹소켓 Connect 콜백함수
	@EventListener
	public void handleWebSocketConnectListener(SessionConnectEvent event){
		System.out.println("WebSocket Connect: "+event);
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) event.getMessage().getHeaders().get("simpUser");
		if(token == null){
			return;
		}
		Object simpSessionId = event.getMessage().getHeaders().get("simpSessionId");
		Object principal = token.getPrincipal();
		if(principal == null){
			return;
		}
		UserDetailsImpl userDetails = (UserDetailsImpl)principal;
		if(simpSessionId != null && userDetails != null){
			ChatResponse res = chatService.connect(simpSessionId.toString(), userDetails.getUsername());
			System.out.println("res: "+res);
			simpMessagingTemplate.convertAndSend("/sub/chat/conn", res);
		}
	}

	// 웹소켓 Disconnect 콜백함수
	@EventListener
	public void handleWebSocketDisconnectListener(SessionDisconnectEvent event){
		System.out.println("WebSocket Disconnect: "+event);
		String simpSessionId = event.getMessage().getHeaders().get("simpSessionId").toString();
		ChatResponse res = chatService.disconnect(simpSessionId);
	}

	// 접속된 유저 목록 불러오기
	@GetMapping("/connected")
	@ResponseBody
	public ResponseEntity<List<String>> loadConnectedUser(){
		return ResponseEntityUtil.okOrNotFound(chatService.loadConnectedUser());
	}

	@GetMapping("/home")
	public String chatroomHome(){
		return "chat/home";
	}

	// 채팅 기록 불러오기 (마지막으로 읽은 곳부터)
	@PostMapping("/msg/load")
	@ResponseBody
	public ResponseEntity<List<Map<String,Object>>> loadChatLog(@RequestBody ChatVO vo){
//		System.out.println("log: "+vo);
		return ResponseEntityUtil.okOrNotFound(chatService.selectChatLogFromLastRead(vo));
	}

	// 채팅 기록 모두 불러오기
	@PostMapping("/msg/load/all")
	@ResponseBody
	public ResponseEntity<List<Map<String,Object>>> loadAllChatLog(@RequestBody ChatVO vo){
		return ResponseEntityUtil.okOrNotFound(chatService.selectChatLog(vo));
	}

	// 채팅 메시지 전송
	@MessageMapping("/chat/send/{roomId}")
	@SendTo("/sub/chat/room/{roomId}")
	public ChatResponse sendChat(@DestinationVariable int roomId, @RequestBody ChatVO vo){
		vo.setRoomId(roomId);
		return chatService.sendChat(vo, ChatResponseHeader.CHAT);
	}
	
	// 채팅 메시지 공감
	@MessageMapping("/chat/emo/{roomId}")
	@SendTo("/sub/chat/room/{roomId}")
	public ChatResponse emoChat(@DestinationVariable int roomId, @RequestBody ChatVO vo){
		vo.setRoomId(roomId);
		return chatService.sendEmoChat(vo);
	}

	// 채팅 메시지 삭제
	@MessageMapping("/chat/delete/{roomId}")
	@SendTo("/sub/chat/room/{roomId}")
	public ChatResponse deleteChat(@DestinationVariable int roomId, @RequestBody ChatVO vo){
		vo.setRoomId(roomId);
		return chatService.deleteChat(vo);
	}

	// 채팅 메시지 삭제 가능한지 판별 (5분 타임아웃)
	@PostMapping("/msg/can/delete")
	@ResponseBody
	public ResponseEntity<Boolean> canDelete(@RequestBody ChatVO vo){
		return ResponseEntity.ok(chatService.canDelete(vo));
	}

	// 채팅 메시지 읽음 처리 
	@MessageMapping("/chat/read/{roomId}")
	public void readChatRoom(@DestinationVariable int roomId, @RequestBody String userId){
		ChatResponse res = chatService.readChatroom(ChatVO.builder().roomId(roomId).userId(userId).build());
		if(res != null){
			simpMessagingTemplate.convertAndSend("/sub/chat/room/"+roomId, res);
		}
	}

	// 채팅방 유저 목록 불러오기
	@GetMapping("/room/user/{roomId}")
	@ResponseBody
	public ResponseEntity<List<Map<String,Object>>> loadChatRoomUser(@PathVariable int roomId){
		return ResponseEntityUtil.okOrNotFound(chatService.loadChatRoomUser(roomId));
	}

	// 채팅 공지
	@MessageMapping("/chat/note/{roomId}")
	@SendTo("/sub/chat/room/{roomId}")
	public ChatResponse noteChat(@DestinationVariable int roomId, @RequestBody ChatVO vo){
		vo.setRoomId(roomId);
		return chatService.noteChat(vo);
	}

	@PostMapping("/room/note/fold")
	@ResponseBody
	public ResponseEntity<Boolean> foldNotification(@RequestBody ChatVO vo){
		return ResponseEntity.ok(false);
	}

	@PostMapping("/note")
	@ResponseBody
	public ResponseEntity<Map<String, Object>> selectNote(@RequestBody ChatVO vo){
		return ResponseEntityUtil.okOrNotFound(chatService.selectNote(vo));
	}

	// 채팅방 생성
	@PostMapping("/room/create")
	@ResponseBody
	@Transactional
	public ResponseEntity<Integer> createChatRoom(@RequestBody ChatVO vo){
		return ResponseEntityUtil.okOrNotFound(chatService.createChatRoom(vo));
	}

//	@MessageMapping("/chat/room/join/{roomId}")
//	@SendTo("/sub/chat/room/{roomId}")
//	public String joinChatRoom(@DestinationVariable int roomId, StompSession session){
//		String id = session.getSessionId();
//		System.out.println("session id: "+ id);
//		return id;
//	}

	@MessageMapping("/chat/room/invite/{roomId}")
	public void inviteUser(@DestinationVariable int roomId, String userId){
		ChatResponse res = chatService.inviteChatroom(ChatVO.builder().roomId(roomId).userId(userId).build());
		if(res != null){
			notificationService.sendChatInvitation(roomId, userId);
			simpMessagingTemplate.convertAndSend("/sub/chat/room/"+roomId, res);
		}
	}

	// 채팅방 나가기
	@MessageMapping("/chat/room/quit/{roomId}")
	@ResponseBody
	public void quitChatroom(@DestinationVariable int roomId, @RequestBody ChatVO vo){
		vo.setRoomId(roomId);
		simpMessagingTemplate.convertAndSend("/sub/chat/room/"+roomId, chatService.quitChatRoom(vo));
		simpMessagingTemplate.convertAndSend("/sub/chat/room/"+roomId,
											 chatService.sendServerChat(ChatResponseHeader.QUIT, vo));
	}

	// 채팅방 정보 불러오기
	@GetMapping("/room/info/{roomId}")
	@ResponseBody
	public ResponseEntity<Map<String,Object>> loadChatRoomInfo(@PathVariable int roomId){
		return ResponseEntityUtil.okOrNotFound(chatService.selectChatroom(roomId));
	}

	// 채팅방 목록 불러오기
	@PostMapping("/room/list")
	@ResponseBody
	public ResponseEntity<List<Map<String,Object>>> loadChatRoomList(@RequestBody ChatVO vo){
		return ResponseEntityUtil.okOrNotFound(chatService.selectChatroom(vo));
	}

	// 채팅방 인원 수
	@GetMapping("/room/hc/{roomId}")
	@ResponseBody
	public ResponseEntity<Integer> getChatRoomHeadCount(@PathVariable int roomId){
		return ResponseEntityUtil.okOrNotFound(chatService.getChatRoomHeadCount(roomId));
	}
//	@PostMapping("/room/last/chat")
//	@ResponseBody
//	public ResponseEntity<List<Map<String,Object>>> getLastChatInRoom(){
//
//		return null;
//	}
}
