package com.momo.vo;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Data
@SuperBuilder
@NoArgsConstructor
public class AlarmVO {
	private String sender;
	private String receiver;
	private String alarmTp;
	private String content;
	private boolean read;
	private LocalDateTime sendDt;
}
