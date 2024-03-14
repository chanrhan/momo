package com.momo.controller;

import com.momo.service.ChatService;
import com.momo.vo.ChatMessageType;
import com.momo.vo.ChatResponse;
import com.momo.vo.ChatVO;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatController {
	private final SimpMessagingTemplate simpMessagingTemplate;
	private final ChatService chatService;

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
		System.out.println("send: "+vo);
		return chatService.sendChat(vo);
	}

	@GetMapping("/msg/last/{roomId}")
	@ResponseBody
	public Map<String,Object> getLastChatLog(@PathVariable int roomId){
		return chatService.getLastChatLog(roomId);
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
		ChatResponse result = chatService.readChatroom(ChatVO.builder().roomId(roomId).userId(userId).build());
		System.out.println("read result: "+ result);
		if(result != null){
			simpMessagingTemplate.convertAndSend("/sub/chat/room/"+roomId, result);
		}
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

	@PostMapping("/room/join")
	@ResponseBody
	public String joinChatroom(@RequestBody ChatVO vo){

		return null;
	}

	@MessageMapping("/room/invite/{roomId}")
	@SendTo("/sub/chat/room/{roomId}")
	public ChatResponse inviteUser(@DestinationVariable int roomId, @RequestBody String userId){
		ChatVO vo = ChatVO.builder().roomId(roomId).userId(userId).build();
		ChatResponse response = chatService.sendServerChat(ChatMessageType.INVITE, vo);
		chatService.joinChatroom(vo);

		return response;
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

//	@PostMapping("/room/last/chat")
//	@ResponseBody
//	public ResponseEntity<List<Map<String,Object>>> getLastChatInRoom(){
//
//		return null;
//	}
}
