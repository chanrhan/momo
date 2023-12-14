package com.phoneManagement.domain.user;

import com.phoneManagement.role.UserRole;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.List;

@Data
public abstract class AbstractUserDomain implements UserDetails {
	protected UserRole      role; // 역할
	protected LocalDateTime signupDate; // 가입일자

	protected List<GrantedAuthority> authorities;
}
