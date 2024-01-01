package com.momo.vo;

import com.momo.domain.user.UserDetailsImpl;
import com.momo.form.UserInfoForm;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class EmployeeVO {
	private String empId;
	private String empPwd;
	private String empNm;
	private String empEmail;
	private String empTel;
	private String role;
	private String shopCd;
	private LocalDateTime regiDt;

	public UserDetailsImpl getUserDetailsImpl(){
		return new UserDetailsImpl(empId, empPwd, role);
	}

	public UserInfoForm getUserInfoForm(){
		return UserInfoForm.builder()
				.id(empId)
				.pwd(empPwd)
				.name(empNm)
				.email(empEmail)
				.tel(empTel)
				.shopCode(shopCd)
				.role(role)
				.regiDt(regiDt)
				.build();
	}

}
