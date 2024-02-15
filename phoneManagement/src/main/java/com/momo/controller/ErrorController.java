package com.momo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/error")
public class ErrorController {

	@GetMapping("/common")
	public String commonError(){
		return "error/error_common";
	}
	@GetMapping("/auth")
	public String authError(){
		return "error/error_auth";
	}

	@GetMapping("/approval")
	public String approvalError(){
		return "error/error_approval";
	}
}
