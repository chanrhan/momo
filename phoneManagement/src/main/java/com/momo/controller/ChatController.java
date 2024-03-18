package com.momo.controller;

import com.momo.domain.user.UserDetailsImpl;
import com.momo.emitter.NotificationService;
import com.momo.enums.ChatResponseHeader;
import com.momo.vo.ChatResponse;
import com.momo.service.ChatService;
import com.momo.vo.ChatVO;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompSession;
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
	private final ChatService          chatService;
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

	@GetMapping("/connected")
	@ResponseBody
	public List<String> getConnectedUsers(){
		return chatService.getConnectedUser();
	}

	@GetMapping("/home")
	public String chatroomHome(){
		return "chat/home";
	}

	@PostMapping("/msg/load")
	@ResponseBody
	public List<Map<String,Object>> loadChatLog(@RequestBody ChatVO vo){
//		System.out.println("log: "+vo);
		return chatService.selectChatLogFromLastRead(vo);
	}

	@PostMapping("/msg/load/all")
	@ResponseBody
	public List<Map<String,Object>> loadAllChatLog(@RequestBody ChatVO vo){
//		System.out.println("log: "+vo);
		return chatService.selectChatLog(vo);
	}

	@MessageMapping("/chat/send/{roomId}")
	@SendTo("/sub/chat/room/{roomId}")
	public ChatResponse sendChat(@DestinationVariable Integer roomId, @RequestBody ChatVO vo){
		vo.setRoomId(roomId);
		ChatResponse result = chatService.sendChat(vo, ChatResponseHeader.CHAT);
		System.out.println("send response: "+result);
		return result;
	}

	@PostMapping("/msg/last")
	@ResponseBody
	public Map<String,Object> getLastChatLog(@RequestBody ChatVO vo){
		return chatService.getLastChatLog(vo);
	}

	@PostMapping("/msg/stacked")
	@ResponseBody
	public int getStackedChat(@RequestBody ChatVO vo){
		return chatService.getStackedChat(vo);
	}


	@PostMapping("/msg/emo")
	@ResponseBody
	public boolean emoChat(@RequestBody ChatVO vo){

		return false;
	}

	@PostMapping("/msg/del")
	@ResponseBody
	public boolean deleteChat(@RequestBody ChatVO vo){
		return false;
	}

	@PostMapping("/msg/del/timeout")
	@ResponseBody
	public boolean checkDeleteTimeout(@RequestBody ChatVO vo){
		return false;
	}

	@MessageMapping("/chat/read/{roomId}")
//	@SendTo("/sub/chat/room/{roomId}")
	public void readChatRoom(@DestinationVariable int roomId, @RequestBody String userId){
		ChatResponse res = chatService.readChatroom(ChatVO.builder().roomId(roomId).userId(userId).build());
//		System.out.println("read result: "+ result);
		if(res != null){
			simpMessagingTemplate.convertAndSend("/sub/chat/room/"+roomId, res);
		}
	}

	@GetMapping("/room/user/{roomId}")
	@ResponseBody
	public List<Map<String,Object>> getChatRoomUser(@PathVariable int roomId){
		return chatService.getChatRoomUser(roomId);
	}

	@PostMapping("/room/note")
	@ResponseBody
	public boolean noteToRoom(@RequestBody ChatVO vo){
		return false;
	}

	@PostMapping("/room/note/fold")
	@ResponseBody
	public boolean foldNotification(@RequestBody ChatVO vo){
		return false;
	}

	@PostMapping("/room/note/del")
	@ResponseBody
	public boolean deleteNote(@RequestBody ChatVO vo){
		return false;
	}

	@PostMapping("/room/create")
	@ResponseBody
	@Transactional
	public int createChatroom(@RequestBody ChatVO vo){
		return chatService.createChatroom(vo);
	}

	@MessageMapping("/chat/room/join/{roomId}")
	@SendTo("/sub/chat/room/{roomId}")
	public String joinChatroom(@DestinationVariable int roomId, StompSession session){
		String id = session.getSessionId();
		System.out.println("session id: "+ id);
//		Map<String,Object> names = session.get
//		for(Object ob : names.keySet()){
//			System.out.println("session attr: "+ob.toString());
//		}
		return id;
	}

	@MessageMapping("/chat/room/invite/{roomId}")
//	@SendTo("/sub/chat/room/{roomId}")
	public void inviteUser(@DestinationVariable int roomId, String userId){
		ChatVO vo = ChatVO.builder().roomId(roomId).userId(userId).build();
		System.out.println("invite room: "+vo);
		ChatResponse res = chatService.inviteChatroom(vo);
		if(res != null){
			notificationService.sendChatInvite(roomId, userId);
			simpMessagingTemplate.convertAndSend("/sub/chat/room/"+roomId, res);
		}
	}

	@PostMapping("/room/quit")
	@ResponseBody
	public boolean quitChatroom(@RequestBody ChatVO vo){

		return false;
	}

	@GetMapping("/room/info/{roomId}")
	@ResponseBody
	public Map<String,Object> getChatroomInfo(@PathVariable int roomId){
		return chatService.selectChatroom(roomId);
	}

	@PostMapping("/room/list")
	@ResponseBody
	public List<Map<String,Object>> getChatroomList(@RequestBody ChatVO vo){
		return chatService.selectChatroom(vo);
	}

	@GetMapping("/room/hc/{roomId}")
	@ResponseBody
	public int getChatRoomHeadCount(@PathVariable int roomId){
		return chatService.getChatRoomHeadCount(roomId);
	}
//	@PostMapping("/room/last/chat")
//	@ResponseBody
//	public ResponseEntity<List<Map<String,Object>>> getLastChatInRoom(){
//
//		return null;
//	}
}
