package com.momo.vo;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;


@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class UserCommonVO extends CommonQueryVO {
	private String id;
	private String empId;
	private String repsId;
	private String pwd;
	private String updatePwd; // 변경할 비밀번호
	private String name;
	private String email;
	private String tel;
	private String terms;

	private String  role;
	private Boolean approvalSt; // 승인 여부

	private Integer       shopId;
	private String        shopNm;
	private String        shopAddr;
	private String        shopTel;
	private String        bpNo; // Business Number
	private String        bpKoNm; // 사업자명(한글)
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

	public ShopCommonVO toShopCommonVO() {
		return ShopCommonVO.builder()
				.repsId(empId)
				.bpNo(bpNo)
				.bpKoNm(bpKoNm)
				.bpEnNm(bpEnNm).corpNm(corpNm).corpTel(corpTel).startDt(startDt).shopId(shopId)
				.shopNm(shopNm).shopAddr(shopAddr).shopTel(shopTel).build();
	}


}
