package com.phoneManagement.domain.member;

import com.phoneManagement.enums.Gender;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
// 고객의 정보를 관리하는 객체
public class Customer {
	private String    store_id; // 매장 코드

	private String id; // 아이디
	private String password; // 비밀번호 (쓸 일 없을듯)

	private String    name; // 실명
	private String    email; // 이메일
	private LocalDate birth_date; // 생년월일
	private Gender    gender; // 성별
	private String    phone_number; // 전화번호

	private String staff_id; // 담당 직원 아이디

	private LocalDateTime register_date; // 등록 일자
}
