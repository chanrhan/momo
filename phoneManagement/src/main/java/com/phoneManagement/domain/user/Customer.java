package com.phoneManagement.domain.user;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import java.time.LocalDateTime;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class Customer extends AbstractUserDomain {
	private String cust_id; // 아이디
	private String cust_pwd; // 비밀번호

	private String cust_nm; // 실명
	private String cust_email; // 이메일
	private String cust_ph_no; // 전화번호

	public Customer(String cust_id, String cust_pwd, List<GrantedAuthority> authorities) {
		this.cust_id     = cust_id;
		this.cust_pwd    = cust_pwd;
		this.authorities = authorities;
	}

	@Override
	public List<GrantedAuthority> getAuthorities() {
		return null;
	}

	@Override
	public String getPassword() {
		return cust_pwd;
	}

	@Override
	public String getUsername() {
		return cust_id;
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
