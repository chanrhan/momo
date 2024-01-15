package com.momo.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
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
	@JsonProperty(value = "bNo")
	private String        bNo; // Business Number
	@JsonProperty(value = "pNm")
	private String        pNm; // 사업자명(영어)
	@JsonProperty(value = "pNm2")
	private String        pNm2; // 사업자명(한글)
	private String        corpNm; // 회사명
	private String        corpTel; // 회사 연락처
	private LocalDateTime startDt; // 개인/법인 사업자 개업연월
	private LocalDateTime regiDt;

	public UserDetailsImpl getUserDetailsImpl() {
		return new UserDetailsImpl(id, pwd, role);
	}

	public ShopVO getShopVO() {
		return ShopVO.builder()
				.bNo(bNo)
				.pKoNm(pNm2)
				.pEnNm(pNm)
				.corpNm(corpNm)
				.corpTel(corpTel)
				.startDt(startDt)

				.shopCd(shopCd)
				.repsId(id)
				.shopNm(shopNm)
				.shopAddr(shopAddr)
				.shopTel(shopTel)
				.build();
	}
}
