package com.momo.service;

import com.momo.enums.ChatResponseHeader;
import com.momo.mapper.ChatMapper;
import com.momo.mapper.UserCommonMapper;
import com.momo.vo.ChatMessageType;
import com.momo.vo.ChatResponse;
import com.momo.vo.ChatVO;
import com.momo.vo.UserCommonVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Log4j2
public class ChatService {
	private final ChatMapper chatMapper;
	private final UserCommonMapper userCommonMapper;

	// Chat Room

	private int getMaxChatRoomId(){
		Integer id = chatMapper.getMaxChatRoomId();
		return (id != null) ? id : 0;
	}

	// 채팅방 넘버는 auto_increment로 할려고 했는데,
	// 방금 생성한 room_id를 반환해줘야 하기 떄문에 일단 현 상태로 보류
	@Transactional
	public int createChatroom(ChatVO vo){
		int roomId = getMaxChatRoomId()+1; // *
		vo.setRoomId(roomId);
		int result = chatMapper.insertChatRoom(vo);
		if(result == 0){
			return result;
		}
		vo.setMaster(true);

		joinChatroom(vo);
		return roomId;
	}

	public int joinChatroom(ChatVO vo){
//		int maxChatId = getMaxChatId(vo.getRoomId());
//		vo.setFirstRead(maxChatId);
//		vo.setLastRead(maxChatId);
		return chatMapper.insertChatRoomMember(vo);
	}

	public int increaseChatRoomHeadCount(int roomId){
		ChatVO vo = ChatVO.builder().roomHc(chatMapper.getChatRoomHeadCount(roomId)+1).build();
		return chatMapper.updateChatRoom(vo);
	}

	public List<Map<String,Object>> selectChatroom(ChatVO vo){
		return chatMapper.selectChatRoom(vo);
	}

	public Map<String,Object> selectChatroom(int roomId){
		return selectChatroom(ChatVO.builder().roomId(roomId).build()).get(0);
	}

	// Chat Log
	private int getMaxChatId(int roomId){
		Integer id = chatMapper.getMaxChatId(roomId);
		if(id == null){
			return 0;
		}
		return id;
	}

	public synchronized ChatResponse sendChat(ChatVO vo){
//		int roomId = vo.getRoomId();
//		vo.setChatId(chatMapper.getMaxChatId(roomId)+1);
//		vo.setCurrHc(chatMapper.getChatRoomHeadCount(roomId));
//		log.info("insert chat: "+vo);
		return ChatResponse.builder()
				.responseHeader(ChatResponseHeader.SEND)
				.chat(chatMapper.insertChat(vo))
				.build();
	}

	public ChatResponse sendServerChat(ChatMessageType type, ChatVO vo){
		vo.setServerSend(true);
		vo.setContent(makeChatContent(vo.getUserId(), type));
		vo.setUserId("");
		return sendChat(vo);
	}

	private String makeChatContent(String userId, ChatMessageType type){
		String username;
		try{
			username = userCommonMapper.selectUser(UserCommonVO.builder().id(userId).build()).get(0).get("name").toString();
		}catch (NullPointerException e){
			log.error(e.getMessage());
			e.printStackTrace();
			username = null;
		}

		switch (type){
			case JOIN -> {
				return username + "님이 입장하였습니다.";
			}
			case INVITE -> {
				return username + "님을 초대하였습니다.";
			}
			case QUIT -> {
				return username + "님이 나갔습니다";
			}
			case KICK -> {
				return username + "님이 추방되었습니다.";
			}
		}
		return null;
	}



	public List<Map<String,Object>> selectChatLog(ChatVO vo){
//		vo.setJoinDt(chatMapper.getChatMemberJoinDate(vo).toString());
		vo.setOrder("send_dt");
		return chatMapper.selectChatLog(vo);
	}

	public List<Map<String,Object>> selectChatLogFromLastRead(ChatVO vo){
		vo.setOrder("send_dt");
		return chatMapper.selectChatLogFromLastRead(vo);
	}


	public Map<String,Object> getLastChatLog(int roomId){
		ChatVO vo = ChatVO.builder().roomId(roomId).chatId(getMaxChatId(roomId)).build();
		List<Map<String,Object>> logs = chatMapper.selectChatLog(vo);
		if(logs == null || logs.isEmpty()){
			return null;
		}
		return logs.get(0);
	}

	public ChatResponse readChatroom(ChatVO vo){
		System.out.println("read Chat: "+vo);
		List<Map<String,Object>> nonReadList = chatMapper.readChatRoom(vo);
		if(nonReadList == null || nonReadList.isEmpty()){
			return null;
		}
		return ChatResponse.builder()
				.responseHeader(ChatResponseHeader.READ)
				.chatLog(nonReadList)
				.build();
	}

	public int getStackedChat(ChatVO vo){
		Integer lastRead = chatMapper.getLastRead(vo);
		if(lastRead == null){
			return 0;
		}
		int maxChatId = getMaxChatId(vo.getRoomId());
		return maxChatId - lastRead;
	}
}
