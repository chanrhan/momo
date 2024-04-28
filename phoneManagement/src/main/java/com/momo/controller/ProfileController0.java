package com.momo.controller;

import com.momo.auth.RoleAuth;
import com.momo.service.ShopService;
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
@Deprecated
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
public class ProfileController0 {
	private final UserService       userService;
	private final ShopService shopService;


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
		return ResponseEntityUtil.okOrNotModified(shopService.updateCorpPoint(corpId, amount));
	}
}
