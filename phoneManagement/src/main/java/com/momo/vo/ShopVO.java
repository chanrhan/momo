package com.momo.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShopVO {
	private int shopCd;
	private String shopNm;
	private String shopTel;
	private String shopAddr;
	private String bNo;
}
