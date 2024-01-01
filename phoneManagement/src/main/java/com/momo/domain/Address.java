package com.momo.domain;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Address {
	private int zipcode;
	private String addr1;
	private String addr2;

	@Builder
	public Address(int zipcode, String addr1, String addr2) {
		this.zipcode = zipcode;
		this.addr1   = addr1;
		this.addr2   = addr2;
	}
}
