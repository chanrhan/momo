package com.phoneManagement.form;

import com.phoneManagement.enums.ValidEnum;
import com.phoneManagement.role.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SignupForm {
	@ValidEnum(enumClass = UserRole.class, message = "역할을 제대로 입력하세요")
	private UserRole role; // 역할
	@NotEmpty(message = "아이디를 입력해야 합니다")
	private String   id; // 아이디
	@NotEmpty(message = "비밀번호를 입력해야 합니다")
	@Size(min = 8,max = 20, message = "비밀번호는 8~20자 사이여야 합니다")
	private String        password; // 비밀번호
	@NotEmpty(message = "비밀번호를 입력해야 합니다")
	private String        confirm_password; // 확인용 비밀번호
	@NotEmpty(message = "이름을 입력해야 합니다")
	private String        name; // 실명
	@NotEmpty(message = "이메일을 입력해야 합니다")
	@Email
	private String        email; // 이메일
	@NotEmpty(message = "전화번호를 입력해야 합니다")
	private String        phone_number; // 전화번호

	private String business_registration_number; // 사업자등록번호
	private String businessman_name; // 사업자명

//	@NotEmpty(message = "매장 코드를 입력해야 합니다")
//	private String   shop_id; // 매장 코드

	private String shop_name; // 매장 이름
	private String shop_addr; // 매장 주소
	private String shop_contact_number; // 매장 연락처

	private LocalDateTime signup_date; // 가입일자
}
