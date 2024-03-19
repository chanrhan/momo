package com.momo.mapper;

import com.momo.vo.ChatVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ChatMapper {
	// Chatroom Info
	public int insertChatRoom(ChatVO vo);
	public int updateChatRoom(ChatVO vo);
	public List<Map<String,Object>> selectChatRoom(ChatVO vo);
	public Integer getMaxChatRoomId();
	public Integer getChatRoomHeadCount(int roomId);

	// Chatroom Member
	public int insertChatRoomMember(ChatVO vo);
	public int deleteChatRoomMember(ChatVO vo);
	public int updateAlarmState(ChatVO vo);
	public int updateNoteFold(ChatVO vo);
	public List<Map<String,Object>> selectChatRoomMember(ChatVO vo);
	public List<Map<String,Object>> selectChatLogFromLastRead(ChatVO vo);
	public List<Map<String,Object>> readChatRoom(ChatVO vo);
	public Integer getLastRead(ChatVO vo);
	public boolean isEqualsToLastRead(ChatVO vo);

	// Chatroom Note
	public Map<String,Object> insertNote(ChatVO vo);
	public Map<String,Object> selectNote(ChatVO vo);

	// Chat Log
	public Map<String,Object> insertChat(ChatVO vo);
	public Integer getMaxChatId(int roomId);
	public Integer getAutoIncrement();
	public List<Map<String,Object>> selectChatLog(ChatVO vo);
	public Map<String,Object> getLastChatLog(ChatVO vo);
	public int getStackedChatCount(ChatVO vo);

	// Chat Emo
	public Map<String,Object> insertChatEmo(ChatVO vo);
	public int updateChatEmo(ChatVO vo);
	public List<String> selectEmoList(ChatVO vo);

	// Chat Deleted
	public int insertDeletedChat(ChatVO vo);

}
