package com.momo.vo;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.momo.enums.ChatResponseHeader;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.Delegate;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.time.OffsetTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Data
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class ChatResponse {
	private ChatResponseHeader responseHeader;
//	private Integer roomId;
//	private Integer            chatId;
//	private Integer userId;

	private List<Map<String,Object>> chatLog;

	@Builder
	public ChatResponse(ChatResponseHeader responseHeader, List<Map<String, Object>> chatLog, Map<String, Object> chat) {
		this.responseHeader = responseHeader;
		this.chatLog        = chatLog;
		if(this.chatLog == null){
			this.chatLog = new ArrayList<>();
		}
		if(chat != null){
			this.chatLog.add(chat);
		}
	}
}
