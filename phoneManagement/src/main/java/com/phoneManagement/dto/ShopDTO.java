package com.phoneManagement.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class ShopDTO extends AbstractQueryDTO{
	public String code;
	public String name;
	public String addr;
	public String phNo;
	public String bisregiNo;

}
