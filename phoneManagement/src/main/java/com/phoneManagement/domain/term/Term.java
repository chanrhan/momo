package com.phoneManagement.domain.term;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class Term {
	private String term_cd;
	private String term_content;
	private LocalDateTime regi_date;
}
