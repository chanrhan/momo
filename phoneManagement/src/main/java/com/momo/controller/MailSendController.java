package com.momo.controller;

import com.momo.enums.MailType;
import com.momo.response.MailCreateResponse;
import com.momo.service.MailSendService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@RequestMapping("/mail")
public class MailSendController {
	private final MailSendService mailSendService;

	@GetMapping("/invite")
	@ResponseBody
	public ResponseEntity<MailCreateResponse> invite(@RequestParam String email, HttpSession session){
		return mailSendService.joinEmail(email, MailType.INVITE, session);
	}

}
