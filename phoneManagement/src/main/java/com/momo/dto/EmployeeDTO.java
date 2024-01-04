package com.momo.dto;

import com.momo.role.UserRole;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class EmployeeDTO extends AbstractQueryDTO {
	public int        shopCode; // 매장 코드
	public UserRole      role; // 역할
	public String        id; // 아이디
	public String        pwd; // 비밀번호
	public String        updatePwd; // 변경할 비밀번호
	public String        name; // 실명
	public String        email; // 이메일
	public String        tel; // 전화번호
	public LocalDateTime regiDate; // 가입일자

	@Builder
	public EmployeeDTO(int shopCode, UserRole role, String id, String pwd, String updatePwd, String name, String email, String tel, LocalDateTime regiDate) {
		this.shopCode  = shopCode;
		this.role      = role;
		this.id        = id;
		this.pwd       = pwd;
		this.updatePwd = updatePwd;
		this.name      = name;
		this.email     = email;
		this.tel       = tel;
		this.regiDate  = regiDate;
	}
}