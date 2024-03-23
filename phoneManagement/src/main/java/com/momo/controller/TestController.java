package com.momo.controller;

import com.momo.service.SaleService;
import com.momo.service.ShopCommonService;
import com.momo.service.UserService;
import com.momo.util.MessageAPIUtil;
import com.momo.vo.SaleVO;
import com.momo.vo.UserVO;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {
	private final UserService       userService;
	private final ShopCommonService shopCommonService;
	private final SaleService saleService;

	@GetMapping("")
	public String testHome(){
		return "test/home";
	}

	@GetMapping("/js")
	public String jsTest(){
		return "test/js_test";
	}

	@Data
	static class Test{
		private String name;
	}

	@RequestMapping("/post")
	@ResponseBody
	public String testPost(@RequestBody Test test){
		System.out.println("server: "+test.getName());
		return "Hello, "+test.name;
	}
	@GetMapping("/get")
	@ResponseBody
	public String testGet(@RequestParam String name){
		return "Hello, "+name;
	}

	@GetMapping("/msg")
	public String msg(){
		return "test/msg";
	}

	@GetMapping("/ws")
	public String webSocketTest(){
		return "test/ws";
	}

	@GetMapping("/sse")
	public String sseTest(){
		return "test/sse";
	}


	@GetMapping("/img")
	public String imageTest(){
		return "test/image";
	}

	@PostMapping("/msg")
	@ResponseBody
	public JSONObject testMessage(@RequestBody Map<String,Object> body){
		System.out.println(body);
		return MessageAPIUtil.send(body);
	}

	@PostMapping("/map")
	@ResponseBody
	public Map<String,Object> testGetMap(@RequestBody SaleVO vo){
		Map<String,Object> map = saleService.selectSale(vo).get(0);
		System.out.println(map);
		System.out.println(map.get("green_md"));
		return map;
	}

	@GetMapping("/tr")
	@ResponseBody
	@Transactional
	public String transactionTest(){
		UserVO vo = UserVO.builder()
				.id("adminadmin")
				.pwd("0000")
				.name("chan_test")
				.email("km1104rs@naver.com")
				.tel("01045240636")
				.terms("00010").build();
		userService.insertUser(vo);

		vo.setRole("MANAGER");
		userService.insertEmp(vo);
		return "Success";
	}

	@GetMapping("/server/pub")
	@ResponseBody
	public boolean serverPublish(){
		sendTestPub("Hello, World");
		return true;
	}

	@SendTo("/sub/test/pub")
	public String sendTestPub(String msg){
		return msg;
	}
}
