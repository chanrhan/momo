package com.momo.controller;

import com.momo.service.MailSendService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class MailSendController {
	private final MailSendService mailSendService;


}
