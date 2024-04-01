package com.momo.controller;

import com.momo.common.enums.codes.CommonErrorCode;
import com.momo.exception.RestApiException;
import com.momo.service.SaleService;
import com.momo.service.ShopCommonService;
import com.momo.service.UserService;
import com.momo.common.util.MessageAPIUtil;
import com.momo.common.vo.SaleVO;
import com.momo.common.vo.UserVO;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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

	@GetMapping("/res/entity")
	public String responseEntityTest(){
		return "test/res_entity";
	}

	@GetMapping("/exception")
	public String exceptionTest(){
		return "test/exception";
	}

	@GetMapping("/exception/get")
	@ResponseBody
	public ResponseEntity<?> getException(){
		throw new RestApiException(CommonErrorCode.INSERT_ERROR, "의도한 에러가 발생하였습니다.");
	}

	@GetMapping("/res/entity/get")
	@ResponseBody
	public ResponseEntity<Map<String,Object>> getResponseEntity(@RequestParam int status){
		Map<String,Object> map = new HashMap<>();
		map.put("id","km151rs");
		map.put("name","chan");
		map.put("tel","01045240636");
		return ResponseEntity.status(status).body(map);
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
