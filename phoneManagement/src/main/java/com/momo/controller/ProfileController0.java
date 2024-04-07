package com.momo.controller;

import com.momo.auth.RoleAuth;
import com.momo.service.ShopCommonService;
import com.momo.service.UserService;
import com.momo.common.util.ResponseEntityUtil;
import com.momo.common.vo.UserVO;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@RequestMapping("/profile")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
public class ProfileController0 {
	private final UserService       userService;
	private final ShopCommonService shopCommonService;

	@GetMapping("/home")
	public String profileInfo(Model model){
		Map<String,Object> user = userService.selectUserByContext();
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
	public ResponseEntity<Boolean> updateProfile(@RequestBody UserVO vo){
		return ResponseEntityUtil.okOrNotModified(userService.updateUser(vo));
	}

	@PostMapping("/update/password")
	@ResponseBody
	public ResponseEntity<Boolean> updatePassword(@RequestBody UserVO vo){
		return ResponseEntityUtil.okOrNotModified(userService.updatePassword(vo));
	}

	@GetMapping("/payment/charge")
	@ResponseBody
	public ResponseEntity<Boolean> chargePoint(HttpSession session, @RequestParam int amount){
		int corpId = Integer.parseInt(session.getAttribute("corp_id").toString());
		return ResponseEntityUtil.okOrNotModified(shopCommonService.updateCorpPoint(corpId, amount));
	}
}
