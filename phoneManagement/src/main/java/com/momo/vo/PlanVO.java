package com.momo.vo;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
public class PlanVO extends AbstractQueryVO {
	private int planId;
	private String planNm;
	private String description;
}
