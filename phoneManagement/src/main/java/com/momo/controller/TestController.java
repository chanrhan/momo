package com.momo.controller;

import com.momo.util.MessageAPIUtil;
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
}
