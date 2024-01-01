package com.momo.domain;

import com.momo.enums.StatusEnum;
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
