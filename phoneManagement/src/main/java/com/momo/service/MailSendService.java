package com.momo.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.awt.*;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class MailSendService {
	private final JavaMailSenderImpl mailSender;
	private int authNumber;

	public void makeRandomNumber(){
		Random random = new Random();
		int checkNum = random.nextInt(8888888)+111111;
		System.out.println("인증번호: "+checkNum);
		authNumber = checkNum;
	}

	public String joinEmail(String email){
		makeRandomNumber();
		String setFrom = "km110rs@naver.com";
		String toMail = email;
		String title = "회원 가입 인증 이메일입니다.";
		String content = "테스트" +
				"<br>" +
				"<h4>" +
				"아래의 인증번호를 인증번호 확인란에 기입하여 주세요." +
				"</h4>" +
				"<br>" +
				authNumber;
		mailSend(setFrom, toMail, title, content);
		return Integer.toString(authNumber);
	}

	public void mailSend(String setFrom, String toEmail, String title, String content){
		MimeMessage message = mailSender.createMimeMessage();
		try{
			MimeMessageHelper helper = new MimeMessageHelper(message,true,"utf-8");
			helper.setFrom(setFrom);
			helper.setTo(toEmail);
			helper.setSubject(title);
			helper.setText(content, true);
			mailSender.send(message);
		}catch (MessagingException e){
			e.printStackTrace();
		}
	}

}
