package com.momo.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
public class MsgCommonVO extends CommonQueryVO {
	private int    formId;
	private String formNm;
	private int    typeId;
	private String content;
	private String selectBtnNm;
	private int    rsvDDay;

	@JsonProperty(value = "bNo")
	private String bNo;

	private int    msgId;
	private int    shopId;
	private String shopNm;
	private int    saleNo;
	private String sendTp;
	private boolean sendSt;
	private String custNm;
	private String custTel;
	private String sellerId;
	private String sellerNm;

	private LocalDate     rsvDt;
	private LocalDateTime regiDt;

	private List<MsgCommonVO> msgRsvList;

	//	public void setRsvDt(String rsvDt) {
	//		Date date = new Date();
	//		this.rsvDt = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
	//	}
}
