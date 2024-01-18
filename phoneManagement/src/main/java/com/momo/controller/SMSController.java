package com.momo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@RequestMapping("/sms")
public class SMSController {
	@GetMapping("/auth")
	@ResponseBody
	public int sendAuthenticationNumber(@RequestParam("tel") String tel){
		// 휴대폰 본인인증 API

		return 123;
	}
}
