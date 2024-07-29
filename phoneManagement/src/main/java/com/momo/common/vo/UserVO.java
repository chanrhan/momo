package com.momo.common.vo;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;
import lombok.experimental.SuperBuilder;


@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class UserVO extends BaseVO {
	private String id;
	private String staffId;
	private String repsId;
	private String pwd;
	private String updatePwd; // 변경할 비밀번호
	private String name;
	private String email;
	private String tel;
	private String terms;

	private int userSt = 1; // 유저 상태 (0: 탈퇴, 1: 정상, 2: 유령)

	private String  role;
	private Integer approvalSt; // 승인 여부

	private String pfp;

	private Integer corpId; // 회사 아이디
	
	private Integer       shopId;
	private String        shopNm;
	private String        shopAddr;
	private String        shopTel;
	private String brNo; // Business Number
	private String brNm; // 사업자명(한글)
	private String        bpEnNm; // 사업자명(영어)
	private String        corpNm; // 회사명
	private String        corpTel; // 회사 연락처
	private String startDt; // 개인/법인 사업자 개업연월
	private String regiDt;

//	public void setStartDt(String startDt) {
//		//		System.out.println("start Date: " + startDt);
//		Date date = new Date();
//		this.startDt = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
//	}

	public ShopVO toShopVO(){
		return ShopVO.builder()
				.shopId(shopId)
//				.corpId(corpId)
				.brNo(brNo)
				.shopNm(shopNm)
				.shopAddr(shopAddr)
				.shopTel(shopTel)
				.build();
	}

	public ShopVO toCorpVO() {
		return ShopVO.builder()
//				.corpId(corpId)
//				.repsId(staffId)
				.brNo(brNo)
				.brNm(corpNm)
				.regiDt(startDt)
				.build();
	}


}
