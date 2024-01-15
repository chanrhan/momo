package com.momo.vo;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
public class ShopVO extends AbstractQueryVO {
	private String        bNo;
	private String        pEnNm; // 사업자명 영문
	private String        pKoNm; // 시압지명 한글
	private String        corpNm;
	private String        corpTel;
	private LocalDateTime startDt;

	private int    shopCd;
	private String repsId;
	private String shopNm;
	private String shopTel;
	private String shopAddr;

}
