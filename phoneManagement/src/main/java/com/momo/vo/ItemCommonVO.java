package com.momo.vo;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
public class ItemCommonVO extends AbstractQueryVO {
	private int planId;
	private String planNm;

	private int exSvcId;
	private String exSvcNm;

	private String description;
}
