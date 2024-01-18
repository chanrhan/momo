package com.momo.util;


import com.momo.domain.user.UserDetailsImpl;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityContextUtil {
	public static String getUsername(){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return ((UserDetailsImpl) authentication.getPrincipal()).getUsername();
	}
}
