package com.momo.controller;

import com.momo.service.UserCommonService;
import com.momo.vo.UserCommonVO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@RequestMapping("/profile")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
public class ProfileController {
	private final UserCommonService userCommonService;

	@GetMapping("/{id}")
	public String profileInfo(Model model, @PathVariable String id){
		Map<String,Object> user = userCommonService.selectUserById(id);
		model.addAttribute("userInfo", user);
		return "profile/profile_info";
	}

	@PostMapping("/update")
	@ResponseBody
	public boolean updateProfile(@RequestBody UserCommonVO vo){
		return userCommonService.updateUser(vo) != 0;
	}

	@PostMapping("/update/password")
	@ResponseBody
	public boolean updatePassword(@RequestBody UserCommonVO vo){
		return userCommonService.updatePassword(vo) != 0;
	}
}
