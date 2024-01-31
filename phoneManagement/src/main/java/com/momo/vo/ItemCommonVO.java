package com.momo.vo;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
public class ItemCommonVO extends CommonQueryVO {
	private int planId;
	private String planNm;

	private int    exsvcId;
	private String exsvcNm;

	private String description;
}
