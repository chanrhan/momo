package com.phoneManagement.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class TermDTO extends AbstractQueryDTO{
	public String        term_cd;
	public String        term_content;
	public LocalDateTime regi_date;
}
