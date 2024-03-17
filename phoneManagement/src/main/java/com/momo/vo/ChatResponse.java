package com.momo.vo;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.momo.enums.ChatResponseHeader;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Data
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class ChatResponse {
	private ChatResponseHeader header;
	private Map<String,Object> body = new HashMap<>();

	@Builder
	public ChatResponse(ChatResponseHeader header, Integer chatId, String userId, List<Map<String, Object>> chatLog, Map<String, Object> chat, boolean serverSend, List<Map<String,Object>> connectedUsers) {
		this.header = header;
		body.put("chat_id",chatId);
		body.put("user_id",userId);
		body.put("server_send", serverSend);
		if(chat != null){
			if(chatLog == null){
				chatLog = new ArrayList<>();
			}
			chatLog.add(chat);
		}
		body.put("chat_log", chatLog);
		body.put("connected_user", connectedUsers);
	}

//	public int getHeader(){
//		return header.ordinal();
//	}
}
