package com.momo.vo;

import com.momo.domain.user.UserDetailsImpl;
import com.momo.form.UserInfoForm;
import com.momo.role.UserRole;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AccountVO {
	private String        id;
	private String        pwd;
	private String        updatePwd; // 변경할 비밀번호
	private String        name;
	private String        email;
	private String        tel;
	private LocalDateTime regiDt;

	public UserDetailsImpl getUserDetailsImpl() {
		return new UserDetailsImpl(id, pwd, UserRole.ADMIN.toString());
	}

}
