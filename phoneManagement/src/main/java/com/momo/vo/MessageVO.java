package com.momo.vo;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
public class MessageVO extends AbstractQueryVO {
	private int    formId;
	private String formNm;
	private int    typeId;
	private String content;
	private String selectBtnNm;
	private int    defaultRsvDt;

	private int    msgId;
	private int    shopCd;
	private int    saleNo;
	private String sendTp;
	private String custNm;
	private String custTel;
	private String sellerId;

	private LocalDate     rsvDt;
	private LocalDateTime regiDt;

	//	public void setRsvDt(String rsvDt) {
	//		Date date = new Date();
	//		this.rsvDt = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
	//	}
}
