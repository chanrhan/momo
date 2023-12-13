package com.phoneManagement.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class ShopDTO extends AbstractQueryDTO{
	public String shop_cd;
	public String shop_nm;
	public String shop_addr;
	public String shop_ph_no;
	public String bisregi_no;

}
