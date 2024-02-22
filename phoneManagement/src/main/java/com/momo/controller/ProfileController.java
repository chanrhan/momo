package com.momo.controller;

import com.momo.auth.RoleAuth;
import com.momo.service.ShopCommonService;
import com.momo.service.UserCommonService;
import com.momo.vo.UserCommonVO;
import jakarta.servlet.http.HttpSession;
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
	private final ShopCommonService shopCommonService;

	@GetMapping("/home")
	public String profileInfo(Model model){
		Map<String,Object> user = userCommonService.selectUserByContext();
		model.addAttribute("userInfo", user);
		return "profile/home";
	}

	@GetMapping("/payment")
	@RoleAuth(role = RoleAuth.Role.EMPLOYEE)
	public String payment(Model model){

		return "profile/payment";
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

	@GetMapping("/payment/charge")
	@ResponseBody
	public boolean chargePoint(HttpSession session, @RequestParam int amount){
		int corpId = Integer.parseInt(session.getAttribute("corp_id").toString());
		return shopCommonService.updateCorpPoint(corpId, amount) != 0;
	}
}
