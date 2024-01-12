package com.momo.vo;

import com.momo.domain.user.UserDetailsImpl;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;


@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
public class UserInfoVO extends AbstractQueryVO {
	private String        id;
	private String        pwd;
	private String        updatePwd; // 변경할 비밀번호
	private String        name;
	private String        email;
	private String        tel;
	private String        termStr;
	private String        role;
	private int           shopCd;
	private String        shopNm;
	private String        shopAddr;
	private String        shopTel;
	private String        biNo; // Business Number
	private String        pNm;
	private String        pNm2;
	private LocalDateTime regiDt;
	public UserDetailsImpl getUserDetailsImpl() {
		return new UserDetailsImpl(id, pwd, role);
	}

	public ShopVO getShopVO() {
		return ShopVO.builder()
				.shopCd(shopCd)
				.repsId(id)
				.shopNm(shopNm)
				.shopAddr(shopAddr)
				.shopTel(shopTel)
				.build();
	}
}
