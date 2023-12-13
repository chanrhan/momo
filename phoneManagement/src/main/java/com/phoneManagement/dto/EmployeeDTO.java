package com.phoneManagement.dto;

import com.phoneManagement.role.UserRole;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class EmployeeDTO extends AbstractQueryDTO{
	public String        shop_cd; // 매장 코드
	public UserRole      role; // 역할
	public String        emp_id; // 아이디
	public String        emp_pwd; // 비밀번호
	public String        emp_cfrm_pwd; // 확인용 비밀번호
	public String        emp_nm; // 실명
	public String        emp_email; // 이메일
	public String        emp_ph_no; // 전화번호
	public LocalDateTime regi_dt; // 가입일자
}