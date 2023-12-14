package com.phoneManagement.domain.shop;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Shop {
	private String code;
	private String name;
	private String addr;
	private String phNo;
	private String bisregiNo;
}
