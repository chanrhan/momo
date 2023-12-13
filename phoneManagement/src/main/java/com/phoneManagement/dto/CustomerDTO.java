package com.phoneManagement.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class CustomerDTO extends AbstractQueryDTO{
	public String        cust_id; // 아이디
	public String        cust_pwd; // 비밀번호
	public String        cust_cfrm_pwd; // 확인용 비밀번호
	public String        cust_nm; // 실명
	public String        cust_email; // 이메일
	public String        cust_ph_no; // 전화번호
	public LocalDateTime regi_dt; // 가입일자
}