package com.momo.dto;

import lombok.*;


@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class ShopDTO extends AbstractQueryDTO{
	public int code;
	public String name;
	public String addr;
	public String tel;
	public String bNo;

	@Builder
	public ShopDTO(int code, String name, String addr, String tel, String bNo) {
		this.code = code;
		this.name = name;
		this.addr = addr;
		this.tel  = tel;
		this.bNo  = bNo;
	}
}
