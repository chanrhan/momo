package com.momo.service;

import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.awt.*;
import java.util.Map;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class MailSendService {
	private final JavaMailSenderImpl mailSender;
	private final ShopCommonService shopCommonService;

	private int makeRandomNumber(){
		Random random = new Random();
		int checkNum = random.nextInt(8888888)+111111;
		System.out.println("인증번호: "+checkNum);
		return checkNum;
	}

	public String joinEmail(String email, HttpSession session){
		int authNumber = makeRandomNumber();

		String userId = session.getAttribute("user_id").toString();
		int shopId = Integer.parseInt(session.getAttribute("shop_id").toString());
		int corpId = Integer.parseInt(session.getAttribute("corp_id").toString());

		String setFrom = "momocorp@naver.com";
		String toMail = email;
		String title = "회원 가입 인증 이메일입니다.";
		String content = makeContent(shopId, corpId, userId, authNumber);
		System.out.println("content: "+content);

		mailSend(setFrom, toMail, title, content);
		return Integer.toString(authNumber);
	}

	private String makeContent(int shopId, int corpId, String userId, int authNumber){
		String shopNm = null;
		if(shopId != 0){
			Map<String,Object> shop = shopCommonService.selectShopById(shopId);
			shopNm = shop.get("shop_nm").toString();
		}


		Map<String,Object> corp = shopCommonService.selectCorpById(corpId);
		String corpNm = corp.get("corp_nm").toString();

		StringBuilder sb = new StringBuilder();
		sb.append("<input type='hidden' id='shop_id' value='" +
				shopId +
				"'>" +
				"<input type='hidden' id='corp_id' value='" +
				corpId +
				"'>");
		sb.append("<p>" +
						  "회사명" + corpNm +
						  "</p>");
		if(shopId != 0 ){
			sb.append("<p>" +
							  "매장명" + shopNm +
							  "</p>");
		}
		sb.append("<h4>" +
						  "아래의 인증번호를 인증번호 확인란에 기입하여 주세요." +
						  "</h4>" +
						  "<br>" +
						  "<h3>" +
						  authNumber +
						  "</h3>");

		return sb.toString();
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
		} catch (jakarta.mail.MessagingException e) {
			throw new RuntimeException(e);
		}
	}

}
