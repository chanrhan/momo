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
	private String shopCode; // 매장 코드

	private String id; // 아이디
	private String pwd; // 비밀번호

	private String name; // 실명
	private String email; // 이메일
	private String phNo; // 전화번호

	public Employee(String id, String pwd, List<GrantedAuthority> authorities) {
		this.id          = id;
		this.pwd         = pwd;
		this.authorities = authorities;
	}

	@Override
	public List<GrantedAuthority> getAuthorities() {
		return null;
	}

	@Override
	public String getPassword() {
		return pwd;
	}

	@Override
	public String getUsername() {
		return id;
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
