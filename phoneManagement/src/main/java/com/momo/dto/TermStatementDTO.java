package com.momo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TermStatementDTO extends AbstractQueryDTO {
	private String  id;
	private String  role;
	private int  code;
	private boolean statement;
}
