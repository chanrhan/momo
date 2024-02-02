package com.momo.vo;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class ShopCommonVO extends CommonQueryVO {
	private String        bpNo;
	private String        bpKoNm; // 시압지명 한글
	private String        bpEnNm; // 사업자명 영문
	private String        corpNm;
	private String        corpTel;
	private String startDt;
	private String regiDt;

	private Integer shopId;
	private String  repsId;
	private String  repsNm;
	private String  shopNm;
	private String  shopTel;
	private String  shopAddr;
}
