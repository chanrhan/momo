package com.momo.domain.term;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class Term {
	private String code;
	private String content;
	private LocalDateTime regiDate;
}
