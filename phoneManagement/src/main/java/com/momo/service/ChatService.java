package com.momo.service;

import com.momo.enums.ChatResponseHeader;
import com.momo.mapper.ChatMapper;
import com.momo.mapper.UserCommonMapper;
import com.momo.vo.ChatResponse;
import com.momo.vo.ChatVO;
import com.momo.vo.UserCommonVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Log4j2
public class ChatService {
	private final ChatMapper chatMapper;
	private final UserCommonMapper userCommonMapper;
	private final Map<String, String> connectedUserMap = new HashMap<>();

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
		System.out.println("create room: "+vo);
		int result = chatMapper.insertChatRoom(vo);
		if(result == 0){
			return result;
		}
		vo.setMaster(true);

		chatMapper.insertChatRoomMember(vo);
//		sendServerChat(ChatMessageType.CREATE, vo);
		return roomId;
	}

	public ChatResponse connect(String simpSessionId, String userId){
		connectedUserMap.put(simpSessionId, userId);
		return ChatResponse.builder()
				.header(ChatResponseHeader.CONNECT)
				.userId(userId)
				.build();
	}

	public ChatResponse disconnect(String simpSessionId){
		String userId = connectedUserMap.get(simpSessionId);
		connectedUserMap.remove(simpSessionId);
		return ChatResponse.builder()
				.header(ChatResponseHeader.DISCONNECT)
				.userId(userId)
				.build();
	}

	public List<String> getConnectedUser(){
		return connectedUserMap.values().stream().toList();
	}

	public List<Map<String,Object>> getChatRoomUser(int roomId){
		return chatMapper.selectChatRoomMember(ChatVO.builder().roomId(roomId).build());
	}

	public ChatResponse joinChatroom(ChatVO vo){
//		int maxChatId = getMaxChatId(vo.getRoomId());
//		vo.setFirstRead(maxChatId);
//		vo.setLastRead(maxChatId);
		chatMapper.insertChatRoomMember(vo);
		return sendServerChat(ChatResponseHeader.JOIN, vo);
	}

	public ChatResponse inviteChatroom(ChatVO vo){
		chatMapper.insertChatRoomMember(vo);
		return sendServerChat(ChatResponseHeader.INVITE, vo);
	}

	public int getChatRoomHeadCount(int roomId){
		return chatMapper.getChatRoomHeadCount(roomId);
	}

	public List<Map<String,Object>> selectChatroom(ChatVO vo){
		vo.setOrder("regi_dt");
		vo.setAsc("desc");
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

	public synchronized ChatResponse sendChat(ChatVO vo, ChatResponseHeader header){
//		int roomId = vo.getRoomId();
//		vo.setChatId(chatMapper.getMaxChatId(roomId)+1);
//		vo.setCurrHc(chatMapper.getChatRoomHeadCount(roomId));
//		log.info("insert chat: "+vo);
		return ChatResponse.builder()
				.header(header)
				.chat(chatMapper.insertChat(vo))
				.serverSend(vo.getServerSend())
				.build();
	}

	public ChatResponse sendServerChat( ChatResponseHeader header, ChatVO vo){
		vo.setServerSend(true);
		vo.setContent(makeChatContent(vo.getUserId(), header));
		vo.setUserId("");
		return sendChat(vo, header);
	}

	private String makeChatContent(String userId, ChatResponseHeader type){
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


	public Map<String,Object> getLastChatLog(ChatVO vo){
//		ChatVO vo = ChatVO.builder().roomId(roomId).chatId(getMaxChatId(roomId)).build();
//		List<Map<String,Object>> logs = chatMapper.selectChatLog(vo);
//		if(logs == null || logs.isEmpty()){
//			return null;
//		}
//		return logs.get(0);
		return chatMapper.getLastChatLog(vo);
	}

	public ChatResponse readChatroom(ChatVO vo){
		System.out.println("read Chat: "+vo);
		List<Map<String,Object>> nonReadList = chatMapper.readChatRoom(vo);
		if(nonReadList == null || nonReadList.isEmpty()){
			return null;
		}
		return ChatResponse.builder()
				.header(ChatResponseHeader.READ)
				.chatLog(nonReadList)
				.build();
	}

	public int getStackedChat(ChatVO vo){
		return chatMapper.getStackedChatCount(vo);
//		Integer lastRead = chatMapper.getLastRead(vo);
//		if(lastRead == null){
//			return 0;
//		}
//		int maxChatId = getMaxChatId(vo.getRoomId());
//		return maxChatId - lastRead;
	}
}
