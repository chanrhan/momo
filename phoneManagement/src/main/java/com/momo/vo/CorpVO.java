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
public class CorpVO extends AbstractQueryVO{
	private String bNo;
	private String pEnNm; // 영문명
	private String pKoNm; // 한글명
	private String corpNm;
	private String corpTel;
	private LocalDateTime startDt;
}
