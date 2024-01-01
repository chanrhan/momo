package com.momo.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class TermDTO extends AbstractQueryDTO{
	public String        code;
	public String        content;
	public LocalDateTime regiDate;
}
