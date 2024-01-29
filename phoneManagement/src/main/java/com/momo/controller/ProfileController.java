package com.momo.controller;

import com.momo.service.AccountService;
import com.momo.vo.UserInfoVO;
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
	private final AccountService accountService;

	@GetMapping("/{id}")
	public String profileInfo(Model model, @PathVariable String id){
		UserInfoVO userInfoVO = accountService.getAccountById(id);
		model.addAttribute("userInfo", userInfoVO);
		return "profile/profile_info";
	}

	@PostMapping("/update")
	@ResponseBody
	public boolean updateProfile(@RequestBody Map<String,Object> map){
		return accountService.update(map) != 0;
	}

	@PostMapping("/update/password")
	@ResponseBody
	public boolean updatePassword(@RequestBody UserInfoVO userInfoVO){
		return accountService.updatePassword(userInfoVO) != 0;
	}
}
