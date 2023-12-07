package com.phoneManagement.domain.member;

import com.phoneManagement.enums.Gender;
import com.phoneManagement.enums.Role;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class User {
	protected String store_code; // 매장 코드
	protected Role   role; // 역할

	protected String username; // 아이디
	protected String password; // 비밀번호

	protected String    realname; // 실명
	protected String    email; // 이메일
	protected LocalDate birth_date; // 생년월일
	protected Gender    gender; // 성별
	protected String    phone_number; // 전화번호

	protected LocalDateTime register_date; // 가입일자
}
