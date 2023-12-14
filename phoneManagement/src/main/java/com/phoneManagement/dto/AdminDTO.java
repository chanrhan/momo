package com.phoneManagement.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class AdminDTO extends AbstractQueryDTO {
	public String        id; // 아이디
	public String        pwd; // 비밀번호
	public String        name; // 실명
	public String        email; // 이메일
	public String        phoneNo; // 전화번호
	public LocalDateTime regiDate; // 가입일자

	public AdminDTO(String id, String pwd, String name, String email, String phoneNo) {
		this.id      = id;
		this.pwd     = pwd;
		this.name    = name;
		this.email   = email;
		this.phoneNo = phoneNo;
	}

}