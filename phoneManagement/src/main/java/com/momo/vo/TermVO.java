package com.momo.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class TermVO {
	private int termCd;
	private String termNm;
	private String content;
	private boolean termRqSt;
	private LocalDateTime regiDt;
}
