package com.momo.controller;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
}
