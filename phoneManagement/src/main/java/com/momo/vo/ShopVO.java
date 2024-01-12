package com.momo.vo;

import lombok.*;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
public class ShopVO extends AbstractQueryVO{
	private int    shopCd;
	private String repsId;
	private String shopNm;
	private String shopTel;
	private String shopAddr;
	private String bNo;

}
