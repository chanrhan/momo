package com.momo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/msg")
public class MessageController {
	@GetMapping("")
	public String msgHome(){
		return "message/msg_home";
	}

	@GetMapping("/reserve")
	public String reserveMsg(){
		return "message/msg_reserve";
	}

	@GetMapping("/send")
	public String sendMsg(){
		return "message/msg_send";
	}
}
