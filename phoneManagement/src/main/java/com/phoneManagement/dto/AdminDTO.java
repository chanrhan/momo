package com.phoneManagement.dto;

import com.phoneManagement.role.UserRole;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class AdminDTO extends AbstractQueryDTO{
	public String        admin_id; // 아이디
	public String        admin_pwd; // 비밀번호
	public String        admin_cfrm_pwd; // 확인용 비밀번호
	public String        admin_nm; // 실명
	public String        admin_email; // 이메일
	public String        admin_ph_no; // 전화번호
	public LocalDateTime regi_dt; // 가입일자

}