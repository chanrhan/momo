package com.momo.service;

import com.momo.mapper.ChatMapper;
import com.momo.mapper.UserCommonMapper;
import com.momo.vo.ChatVO;
import com.momo.vo.UserCommonVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ChatService {
	private final ChatMapper chatMapper;
	private final UserCommonMapper userCommonMapper;

	// Chat Room
	private int getMaxChatRoomId(){
		Integer id = chatMapper.getMaxChatRoomId();
		return (id != null) ? id : 0;
	}

	@Transactional
	public int createChatroom(ChatVO vo){
		int roomId = getMaxChatRoomId()+1;
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
		return chatMapper.insertChatRoomMember(vo);
	}

	public int increateChatRoomHeadCount(int roomId){
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

	@Transactional
	public int sendChat(ChatVO vo){
		int maxChatId = getMaxChatId(vo.getRoomId())+1;
		vo.setChatId(maxChatId);
		vo.setNonRead(chatMapper.getChatRoomHeadCount(vo.getRoomId())-1);
		chatMapper.insertChat(vo);
		vo.setLastRead(maxChatId);
		return readChat(vo);
	}

	public int readChat(ChatVO vo){
		return chatMapper.updateLastRead(vo);
	}

	public int sendWelcomeMessage(int roomId, String userId){
		if(roomId == 0 || userId == null){
			return 0;
		}
		ChatVO chat = ChatVO.builder()
				.roomId(roomId)
				.userId("")
				.chatId(getMaxChatId(roomId)+1)
				.serverSend(true)
				.build();

		String name = "";
		try{
			name = userCommonMapper.selectUser(UserCommonVO.builder().id(userId).build()).get(0).get("name").toString();
		}catch (NullPointerException e){
			System.out.println(e.getMessage());
			e.printStackTrace();
		}
		chat.setContent(name + "님이 입장하였습니다.");
	 	return 	chatMapper.insertChat(chat);
	}

	public List<Map<String,Object>> selectChatLog(ChatVO vo){
		vo.setOrder("send_dt");
		return chatMapper.selectChatLog(vo);
	}

	public Map<String,Object> getLastChatLog(int roomId){
		ChatVO vo = ChatVO.builder().roomId(roomId).chatId(getMaxChatId(roomId)).build();
		return chatMapper.selectChatLog(vo).get(0);
	}

	public int readChatroom(ChatVO vo){
		vo.setLastRead(getMaxChatId(vo.getRoomId()));
		return readChat(vo);
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
