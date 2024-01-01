package com.momo.controller;

import com.momo.dto.AdminDTO;
import com.momo.service.AdminService;
import com.momo.vo.AdminVO;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {
	private final AdminService adminService;

	@GetMapping("")
	public String test_home(){
		return "test/home";
	}

	@GetMapping("/search")
	public String test_search(AdminDTO adminDTO){
		return "test/search";
	}

	@GetMapping("/ajax")
	@ResponseBody
	public String test_ajax(){
		return "Hello ajax";
	}

	@Data
	static class VO{
		String strValue;
		int intValue;
	}

	@PostMapping("/ajax")
	public @ResponseBody VO test_ajax_post(@RequestBody VO vo){
		System.out.println(vo);
		vo.setIntValue(999);
		return vo;
	}

	@PostMapping("/search")
	@ResponseBody
	public List<AdminVO> test_search_form(@RequestBody AdminDTO adminDTO){
		return adminService.search(adminDTO);
	}
}
