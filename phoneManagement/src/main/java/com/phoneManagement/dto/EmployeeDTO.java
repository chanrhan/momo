package com.phoneManagement.dto;

import com.phoneManagement.role.UserRole;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class EmployeeDTO extends AbstractQueryDTO {
	public String        shopCode; // 매장 코드
	public UserRole      role; // 역할
	public String        id; // 아이디
	public String        pwd; // 비밀번호
	public String        name; // 실명
	public String        email; // 이메일
	public String        phNo; // 전화번호
	public LocalDateTime regiDate; // 가입일자

	public EmployeeDTO(UserRole role, String id, String pwd, String name, String email, String phNo) {
		this.role  = role;
		this.id    = id;
		this.pwd   = pwd;
		this.name  = name;
		this.email = email;
		this.phNo  = phNo;
	}
}