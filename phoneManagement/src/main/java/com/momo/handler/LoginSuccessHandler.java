package com.momo.handler;


import com.momo.service.UserCommonService;
import com.momo.util.SecurityContextUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;
import java.util.Map;

@RequiredArgsConstructor
public class LoginSuccessHandler implements AuthenticationSuccessHandler {
	private final UserCommonService userCommonService;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
		AuthenticationSuccessHandler.super.onAuthenticationSuccess(request, response, chain, authentication);
	}

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
		System.out.println("LOGIN INTERCEPTOR");
		HttpSession session = request.getSession();
		if(session == null){
			response.sendRedirect("/");
			return;
		}

		String username = SecurityContextUtil.getUsername();
		if(username == null || "".equals(username)){
			response.sendRedirect("/error/common");
			return;
		}

//		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if(authentication == null){
			response.sendRedirect("/error/common");
			return;
		}

		if(!SecurityContextUtil.hasRole("REPS") && !SecurityContextUtil.hasRole("MANAGER")){
			response.sendRedirect("/home");
			return;
		}

		Map<String,Object> emp = userCommonService.selectEmpById(username);
		System.out.println("emp: "+emp);
		if(emp == null || emp.isEmpty()){
			response.sendRedirect("/error/common");
			return;
		}
		Object shopId = emp.get("shop_id");
		Object corpId = emp.get("corp_id");
		if(shopId == null || corpId == null){
			response.sendRedirect("/error/common");
			return;
		}

		session.setAttribute("shop_id", shopId);
		session.setAttribute("corp_id", corpId);

		response.sendRedirect("/home");
	}
}
