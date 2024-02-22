package com.momo.controller;

import com.momo.service.MailSendService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@RequestMapping("/mail")
public class MailSendController {
	private final MailSendService mailSendService;

	@GetMapping("/invite")
	@ResponseBody
	public String inviteByEmail(@RequestParam String email){
		return mailSendService.joinEmail(email);
	}

}
