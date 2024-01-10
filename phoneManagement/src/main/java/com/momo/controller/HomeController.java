package com.momo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class HomeController {

	@GetMapping("/")
	public String homePreview(){
		return "home/preview";
	}

	@PreAuthorize("isAuthenticated()")
	@GetMapping("/home")
	public String home(){
		return "/home/home";
	}
}
