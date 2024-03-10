package com.momo.service;

import com.momo.mapper.ChatMapper;
import com.momo.vo.ChatVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ChatService {
	private final ChatMapper chatMapper;

	private int getMaxChatroomId(){
		Integer id = chatMapper.getMaxChatroomId();
		return (id != null) ? id : 0;
	}

	@Transactional
	public int createChatroom(ChatVO vo){
		vo.setRoomId(getMaxChatroomId()+1);
		int result = chatMapper.insertChatroom(vo);
		if(result == 0){
			return result;
		}
		vo.setMaster(true);

		return chatMapper.insertChatroomMember(vo);
	}

	@Transactional
	public int joinChatroom(ChatVO vo){
		chatMapper.insertChatroomMember(vo);
		sendWelcomeMessage(vo.getRoomId(), vo.getUserId());

		vo.setRoomHc(chatMapper.getChatroomHeadCount(vo.getRoomId())+1);
		return chatMapper.updateChatroom(vo);
	}

	private int getMaxChatId(int roomId){
		Integer id = chatMapper.getMaxChatId(roomId);
		if(id == null){
			return 0;
		}
		return id;
	}

	public int sendChat(ChatVO vo){
		vo.setChatId(getMaxChatId(vo.getRoomId())+1);
		vo.setNonRead(chatMapper.getChatroomHeadCount(vo.getRoomId())-1);
		return chatMapper.insertChat(vo);
	}

	public void sendWelcomeMessage(int roomId, String userId){
		if(roomId == 0 || userId == null){
			return;
		}
		ChatVO chat = ChatVO.builder()
				.roomId(roomId)
				.chatId(getMaxChatId(roomId)+1)
				.serverSend(true)
				.build();
		chat.setContent(userId + "님이 입장하였습니다.");
		chatMapper.insertChat(chat);
	}

	public List<Map<String,Object>> selectChatroom(ChatVO vo){
		return chatMapper.selectChatroom(vo);
	}

	public Map<String,Object> selectChatroom(int roomId){
		return selectChatroom(ChatVO.builder().roomId(roomId).build()).get(0);
	}

	public List<Map<String,Object>> selectChatLog(ChatVO vo){
		vo.setOrder("send_dt");
		return chatMapper.selectChatLog(vo);
	}
}
