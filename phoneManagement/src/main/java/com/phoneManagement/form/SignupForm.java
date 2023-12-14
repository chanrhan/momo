package com.phoneManagement.form;

import com.phoneManagement.dto.AdminDTO;
import com.phoneManagement.dto.CustomerDTO;
import com.phoneManagement.dto.EmployeeDTO;
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
	private String role; // 역할
	private String   id; // 아이디
	private String   pwd; // 비밀번호
//	private String   confirm_pwd; // 확인용 비밀번호
	private String   name; // 실명
	private String   email; // 이메일
	private String   phNo; // 전화번호

	private String bisregiNo; //사업자등록번호
	private String bisName;   //사업자명

	private String shopName; // 매장 이름
	private String shopAddr; // 매장 주소
	private String shopPhNo; // 매장 연락처

	public AdminDTO getAdminDTO() {
		return new AdminDTO(id, pwd, name, email, phNo);
	}

	public CustomerDTO getCustomerDTO() {
		return new CustomerDTO(id, pwd, name, email, phNo);
	}

	public EmployeeDTO getEmployeeDTO() {
		return new EmployeeDTO(Enum.valueOf(UserRole.class, role), id, pwd, name, email, phNo);
	}


}
