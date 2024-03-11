package com.momo.controller;

import com.momo.service.ChatService;
import com.momo.vo.ChatVO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatController {
	private final ChatService chatService;

	@GetMapping("/home")
	public String chatroomHome(){
		return "chat/home";
	}

	@PostMapping("/msg/log")
	@ResponseBody
	public List<Map<String,Object>> getChatLog(@RequestBody ChatVO vo){
		System.out.println("log: "+vo);
		return chatService.selectChatLog(vo);
	}

	@MessageMapping("/chat/{roomId}")
	@SendTo("/sub/chat/room/{roomId}")
//	@Transactional
	public int sendChat(@DestinationVariable Integer roomId, @RequestBody ChatVO vo){
		vo.setRoomId(roomId);
		System.out.println("send: "+vo);
		int result = chatService.sendChat(vo);
		return roomId;
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

	@PostMapping("/room/read")
	@ResponseBody
	public boolean readAllMessageInRoom(@RequestBody ChatVO vo){
		return chatService.readChatroom(vo) != 0;
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

	@PostMapping("/room/invite")
	@ResponseBody
	public boolean inviteUser(@RequestBody ChatVO vo){
		int result = chatService.joinChatroom(vo);
		if(result == 0){
			return false;
		}
		int roomId = vo.getRoomId();
		result = chatService.sendWelcomeMessage(roomId, vo.getUserId());
		if(result == 0){
			return false;
		}

		result = chatService.increateChatRoomHeadCount(roomId);
		return result != 0;
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
