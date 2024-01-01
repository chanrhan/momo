package com.momo.vo;

import com.momo.domain.user.UserDetailsImpl;
import com.momo.form.UserInfoForm;
import com.momo.role.UserRole;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class CustomerVO {
	private String custId;
	private String custPwd;
	private String custNm;
	private String        custEmail;
	private String        custTel;
	private LocalDateTime regiDt;

	public UserDetailsImpl getUserDetailsImpl(){
		return new UserDetailsImpl(custId, custPwd, UserRole.CUSTOMER.toString());
	}

	public UserInfoForm getUserInfoForm(){
		return UserInfoForm.builder()
				.id(custId)
				.pwd(custPwd)
				.name(custNm)
				.email(custEmail)
				.tel(custTel)
				.regiDt(regiDt)
				.role("CUSTOMER")
				.build();
	}
}
