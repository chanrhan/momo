package com.phoneManagement.form;

import com.phoneManagement.enums.Gender;
import com.phoneManagement.enums.ValidEnum;
import com.phoneManagement.enums.StaffRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Singular;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SignupForm {
	@NotEmpty(message = "매장 코드를 입력해야 합니다")
	private String        store_id; // 매장 코드
	@ValidEnum(enumClass = StaffRole.class, message = "역할을 제대로 입력하세요")
	private StaffRole     staff_role; // 역할
	@NotEmpty(message = "아이디를 입력해야 합니다")
	private String        id; // 아이디
	@NotEmpty(message = "비밀번호를 입력해야 합니다")
	@Size(min = 8,max = 20, message = "비밀번호는 ")
	private String        password; // 비밀번호
	@NotEmpty(message = "비밀번호를 입력해야 합니다")
	private String        confirm_password; // 확인용 비밀번호
	@NotEmpty(message = "이름을 입력해야 합니다")
	private String        name; // 실명
	@NotEmpty(message = "이메일을 입력해야 합니다")
	@Email
	private String        email; // 이메일
	@NotNull(message = "생년월일을 입력해야 합니다")
	private LocalDate     birth_date; // 생년월일
	@ValidEnum(enumClass = Gender.class, message = "성별을 제대로 입력하세요")
	private Gender        gender; // 성별
	@NotEmpty(message = "전화번호를 입력해야 합니다")
	private String        phone_number; // 전화번호


	private String        staff_id; // 담당 직원 아이디

	private LocalDateTime register_date; // 가입일자
}
