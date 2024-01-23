package com.momo.vo;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Data
@SuperBuilder
@NoArgsConstructor
public class AlarmVO {
	private int           alarmId;
	private String        senderId;
	private String        receiverId;
	private String        alarmTp;
	private String        content;
	private boolean       readSt = false;
	private LocalDateTime sendDt;

	private String senderNm;
	private String shopNm;
}
