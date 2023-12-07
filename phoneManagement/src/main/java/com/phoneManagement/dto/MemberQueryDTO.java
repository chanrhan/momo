package com.phoneManagement.dto;

import com.phoneManagement.enums.Gender;
import com.phoneManagement.enums.StaffRole;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class MemberQueryDTO {
	private String        store_id; // 매장 코드
	private StaffRole     staff_role; // 역할
	private String        id; // 아이디
	private String        password; // 비밀번호
	private String        confirm_password; // 확인용 비밀번호
	private String        name; // 실명
	private int           age; // 나이
	private String        email; // 이메일
	private LocalDate     birth_date; // 생년월일
	private Gender        gender; // 성별
	private String        phone_number; // 전화번호
	private String        staff_id; // 담당 직원 아이디
	private LocalDateTime register_date; // 가입일자
}
