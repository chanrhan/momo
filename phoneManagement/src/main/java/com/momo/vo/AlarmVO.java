package com.momo.vo;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
public class AlarmVO extends CommonQueryVO{
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
