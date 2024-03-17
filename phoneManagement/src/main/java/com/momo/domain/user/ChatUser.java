package com.momo.domain.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChatUser {
	private String userId;
	private String simpSessionId;
}
