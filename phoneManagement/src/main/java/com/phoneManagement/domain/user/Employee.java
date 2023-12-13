package com.phoneManagement.domain.user;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class Employee extends AbstractUserDomain {
	private String shop_cd; // 매장 코드

	private String emp_id; // 아이디
	private String emp_pwd; // 비밀번호

	private String emp_nm; // 실명
	private String emp_email; // 이메일
	private String emp_ph_no; // 전화번호

	public Employee(String emp_id, String emp_pwd, List<GrantedAuthority> authorities) {
		this.emp_id      = emp_id;
		this.emp_pwd     = emp_pwd;
		this.authorities = authorities;
	}

	@Override
	public List<GrantedAuthority> getAuthorities() {
		return null;
	}

	@Override
	public String getPassword() {
		return emp_pwd;
	}

	@Override
	public String getUsername() {
		return emp_id;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}
