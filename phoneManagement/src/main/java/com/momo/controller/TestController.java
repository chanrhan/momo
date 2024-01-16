package com.momo.controller;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {
	@GetMapping("")
	public String testHome(){
		return "test/home";
	}

	@Data
	static class Test{
		private String strData;
	}

	@RequestMapping("/post")
	@ResponseBody
	public String testPost(String str){
		System.out.println("server: "+str);
		return "Hello, "+str;
	}
	@GetMapping("/get")
	@ResponseBody
	public String testGet(@RequestParam String name){
		return "Hello, "+name;
	}
}
