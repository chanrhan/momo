package com.momo.controller;

import com.momo.service.UserService;
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
	private final UserService userService;

	@GetMapping("/{id}")
	public String profileInfo(Model model, @PathVariable String id){
		Map<String,Object> userMap = userService.getAccountById(id);
		model.addAttribute("userInfo", userMap);
		return "profile/profile_info";
	}

	@PostMapping("/update")
	@ResponseBody
	public boolean updateProfile(@RequestBody Map<String,Object> map){
		return userService.update(map) != 0;
	}

	@PostMapping("/update/password")
	@ResponseBody
	public boolean updatePassword(@RequestBody Map<String ,Object> map){
		return userService.updatePassword(map) != 0;
	}
}
