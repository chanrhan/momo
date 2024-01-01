package com.momo.vo;

import com.momo.domain.user.UserDetailsImpl;
import com.momo.form.UserInfoForm;
import com.momo.role.UserRole;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AdminVO {
	private String adminId;
	private String adminPwd;
	private String adminNm;
	private String adminEmail;
	private String adminTel;
	private LocalDateTime regiDt;

	public UserDetailsImpl getUserDetailsImpl(){
		return new UserDetailsImpl(adminId, adminPwd, UserRole.ADMIN.toString());
	}

	public UserInfoForm getUserInfoForm(){
		return UserInfoForm.builder()
				.id(adminId)
				.pwd(adminPwd)
				.name(adminNm)
				.email(adminEmail)
				.tel(adminTel)
				.regiDt(regiDt)
				.role("ADMIN")
				.build();
	}

}
