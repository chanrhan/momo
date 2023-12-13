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
public class Admin extends AbstractUserDomain {
	private String admin_id; // 아이디
	private String admin_pwd; // 비밀번호

	private String admin_nm; // 실명
	private String admin_email; // 이메일
	private String admin_ph_no; // 전화번호

	public Admin(String admin_id, String admin_pwd, List<GrantedAuthority> authorities) {
		this.admin_id    = admin_id;
		this.admin_pwd   = admin_pwd;
		this.authorities = authorities;
	}

	@Override
	public List<GrantedAuthority> getAuthorities() {
		return null;
	}

	@Override
	public String getPassword() {
		return admin_pwd;
	}

	@Override
	public String getUsername() {
		return admin_id;
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
