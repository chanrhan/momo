package com.momo.util;


import com.momo.domain.user.UserDetailsImpl;
import com.momo.service.UserCommonService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Map;

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
