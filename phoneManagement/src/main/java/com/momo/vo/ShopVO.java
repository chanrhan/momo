package com.momo.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
public class ShopVO extends AbstractQueryVO {
	@JsonProperty(value = "bNo")
	private String        bNo;
	@JsonProperty(value = "pEnNm")
	private String        pEnNm; // 사업자명 영문
	@JsonProperty(value = "pKoNm")
	private String        pKoNm; // 시압지명 한글
	private String        corpNm;
	private String        corpTel;
	private LocalDateTime startDt;

	private int    shopCd;
	private String repsId;
	private String repsNm;
	private String shopNm;
	private String shopTel;
	private String shopAddr;

}
