package com.phoneManagement.form;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginForm {
	@NotEmpty(message = "아이디를 입력하세요")
	public String id;
	@NotEmpty(message = "비밀번호를 입력하세요")
	public String password;
}
