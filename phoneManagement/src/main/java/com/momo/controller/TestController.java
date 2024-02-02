package com.momo.controller;

import com.momo.service.SaleService;
import com.momo.service.ShopCommonService;
import com.momo.service.UserCommonService;
import com.momo.util.MessageAPIUtil;
import com.momo.vo.SaleVO;
import com.momo.vo.ShopCommonVO;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {
	private final UserCommonService userCommonService;
	private final ShopCommonService shopCommonService;
	private final SaleService saleService;

	@GetMapping("")
	public String testHome(){
		return "test/home";
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
}
