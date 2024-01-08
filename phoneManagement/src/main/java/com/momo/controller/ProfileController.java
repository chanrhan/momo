package com.momo.controller;

import com.momo.form.UserInfoForm;
import com.momo.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/profile")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
public class ProfileController {
	private final AccountService accountService;

//	@PreAuthorize("isAuthenticated()")
	@GetMapping("/{id}")
	public String profileInfo(Model model, @PathVariable String id){
		UserInfoForm userInfoForm = accountService.getUserById(id);
		model.addAttribute("userInfo", userInfoForm);
		return "profile/profile_info";
	}

	@PostMapping("/update")
	@ResponseBody
	public boolean updateProfile(@RequestBody UserInfoForm userInfoForm){
		int result = accountService.update(userInfoForm);
		return result != 0;
	}

	@PostMapping("/update/password")
	@ResponseBody
	public boolean updatePassword(@RequestBody UserInfoForm userInfoForm){
		int result = accountService.updatePassword(userInfoForm);
		return result != 0;
	}
}
