package com.phoneManagement.domain;

import com.phoneManagement.enums.StatusEnum;
import lombok.Data;

@Data
public class Message {
	public StatusEnum status;
	public Object data;
	public String msg;

	public Message() {
		this.status = StatusEnum.BAD_REQUEST;
		this.data   = null;
		this.msg    = null;
	}
}
