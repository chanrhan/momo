package com.momo.common.util;


import com.momo.common.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

@RequiredArgsConstructor
public class SecurityContextUtil {

	public static String getUsername(){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return ((UserDetailsImpl) authentication.getPrincipal()).getUsername();
	}

	public static boolean hasRole(String role){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return authentication.getAuthorities().contains(new SimpleGrantedAuthority(role));
	}
}
