package com.momo.vo;

import com.momo.domain.user.UserDetailsImpl;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
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
	private String        bNo; // Business Number
	private String        bNm; // Business Name
	private String        pNm;
	private String        pNm2;
	private LocalDateTime regiDt;

	@Builder
	public UserInfoVO(String id, String pwd, String updatePwd, String name, String email, String tel, String termStr, String role, int shopCd, String shopNm, String shopAddr, String shopTel, String bNo, String bNm, String pNm, String pNm2, LocalDateTime regiDt) {
		this.id        = id;
		this.pwd       = pwd;
		this.updatePwd = updatePwd;
		this.name      = name;
		this.email     = email;
		this.tel       = tel;
		this.termStr   = termStr;
		this.role      = role;
		this.shopCd    = shopCd;
		this.shopNm    = shopNm;
		this.shopAddr  = shopAddr;
		this.shopTel   = shopTel;
		this.bNo       = bNo;
		this.bNm       = bNm;
		this.pNm       = pNm;
		this.pNm2      = pNm2;
		this.regiDt    = regiDt;
	}

	public UserDetailsImpl getUserDetailsImpl(){
		return new UserDetailsImpl(id, pwd, role);
	}

	public ShopVO getShopVO(){
		return new ShopVO(shopCd, shopNm, shopTel, shopAddr, bNo);
	}
}
