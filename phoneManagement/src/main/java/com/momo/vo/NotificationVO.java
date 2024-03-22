package com.momo.vo;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class NotificationVO extends CommonQueryVO {
	private Integer       alarmId;
	private String        senderId;
	private String        receiverId;
	private String        alarmTp;
	private String        content;
	private Boolean       readSt;
	private String sendDt;

	private String senderNm;
	private String shopNm;

	private Integer corpId;
}
