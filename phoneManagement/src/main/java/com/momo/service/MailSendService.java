package com.momo.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import java.awt.*;

@Service
@RequiredArgsConstructor
public class MailSendService {
	private JavaMailSenderImpl mailSender;

	public void makeRandomNumber(){

	}

	public String joinEmail(String email){

		return "";
	}

	public void mailSend(String setForm, String toEmail, String title, String content){

	}

}
