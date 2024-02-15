package com.momo.controller;

import com.momo.auth.RoleAuth;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class HomeController {

	@GetMapping("/")
	public String homePreview(){
		return "main/preview";
	}

	@GetMapping("/home")
	@PreAuthorize("isAuthenticated()")
	public String home(){
		return "main/home";
	}
}
