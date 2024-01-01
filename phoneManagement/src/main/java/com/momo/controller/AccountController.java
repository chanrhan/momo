package com.momo.controller;

import com.momo.dto.ShopDTO;
import com.momo.form.UserInfoForm;
import com.momo.service.*;
import com.momo.util.BusinessmanApiUtil;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@RequestMapping("/account")
public class AccountController {
	private final AccountService  accountService;

	private final ShopService shopService;

	@GetMapping("/login")
	public String login() {
		return "account/login";
	}

	@GetMapping("/signup")
	public String signup() {
		return "account/signup";
	}

	@GetMapping("/role")
	public String roleSelect() {
		return "account/role_select";
	}

	@GetMapping("/role/reps")
	public String roleReps(Model model) {
		model.addAttribute("role", "REPS");
		return "account/role_employee";
	}

	@GetMapping("/role/manager")
	public String roleManager(Model model) {
		model.addAttribute("role", "MANAGER");
		return "account/role_employee";
	}

	@GetMapping("/role/customer")
	public String roleCustomer() {
		return "account/role_customer";
	}

	@PostMapping("/submit")
	@ResponseBody
	public boolean roleSubmit(@RequestBody UserInfoForm userInfoForm) {
		System.out.println(userInfoForm);
		if (userInfoForm.getRole().equals("REPS")) {
			// 매장 이름과 주소 해싱해서 매장 코드 생성
			ShopDTO shopDTO  = userInfoForm.getShopDTO();
			String  shopCode = "0x0bf81";
			shopDTO.setCode(shopCode);
			userInfoForm.setShopCode(shopCode);
			shopService.insert(shopDTO);
		}
		accountService.signup(userInfoForm);
		return true;
	}

	// 아이디 중복체크 API
	@GetMapping("/validate/dup/{target}")
	@ResponseBody
	public boolean checkDupId(@PathVariable String target, @RequestParam("value") String value) {
		System.out.println(target);
		System.out.println(value);
		switch (target) {
			case "id":
				return accountService.getUserById(value) == null;
			case "email":
				return accountService.getUserByEmail(value) == null;
		}
		return false;
	}

	@PostMapping("/validate/bno")
	@ResponseBody
	public JSONObject validateBusinessNumber(@RequestBody JSONObject data) {
		return BusinessmanApiUtil.validate(JSONObject.toJSONString(data));
	}
}
