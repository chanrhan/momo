package com.momo.vo;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class TermVO {
	private String        userId;
	private String        role;
	private boolean       checked;
	private LocalDateTime regiDt;

	private int           termCd;
	private String        termNm;
	private String        content;
	private boolean       termRqSt;

	@Builder
	public TermVO(String userId, String role, boolean checked, LocalDateTime regiDt, int termCd, String termNm, String content, boolean termRqSt) {
		this.userId   = userId;
		this.role     = role;
		this.checked  = checked;
		this.regiDt   = regiDt;
		this.termCd   = termCd;
		this.termNm   = termNm;
		this.content  = content;
		this.termRqSt = termRqSt;
	}
}
