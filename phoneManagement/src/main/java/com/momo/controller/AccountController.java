package com.momo.controller;

import com.momo.service.*;
import com.momo.util.BusinessmanApiUtil;
import com.momo.vo.ShopVO;
import com.momo.vo.TermVO;
import com.momo.vo.UserInfoVO;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/account")
public class AccountController {
	private final AccountService  accountService;
	private final RoleDetailUserService roleDetailUserService;

	private final TermService termService;
	private final ShopService shopService;

	@GetMapping("/login")
	public String login() {
		return "account/login";
	}

	@GetMapping("/signup")
	public String signup(Model model) {
		List<TermVO> termList = termService.selectAll();
		model.addAttribute("terms", termList);
		return "account/signup";
	}

	@PreAuthorize("isAuthenticated()")
	@GetMapping("/role")
	public String roleSelect() {
		return "account/role_select";
	}

	@PreAuthorize("isAuthenticated()")
	@GetMapping("/role/reps")
	public String roleReps(Model model) {
		model.addAttribute("role", "REPS");
		return "account/role_employee";
	}

	@PreAuthorize("isAuthenticated()")
	@GetMapping("/role/manager")
	public String roleManager(Model model) {
		model.addAttribute("role", "MANAGER");
		return "account/role_employee";
	}

	@PreAuthorize("isAuthenticated()")
	@GetMapping("/role/customer")
	public String roleCustomer() {
		return "account/role_customer";
	}

	@PostMapping("/submit")
	@ResponseBody
	public boolean signupSubmit(@RequestBody UserInfoVO userInfoVO) {
		System.out.println(userInfoVO);
//		int result = termService.enrollTermStatement(userInfoVO.getId(), userInfoVO.getRole(), userInfoVO.getTermStr());
//		if(result == 0){
//			return false;
//		}
		return accountService.insert(userInfoVO) != 0;
	}

	@PostMapping("/submit/role")
	@ResponseBody
	public boolean roleSubmit(@RequestBody UserInfoVO userInfoVO){
		System.out.println(userInfoVO);
		int result = 0;
		result = accountService.updateRole(userInfoVO);
		if(result == 0){
			return false;
		}

		String role = userInfoVO.getRole();
		if (role.equals("REPS")) {
			ShopVO shopVO = userInfoVO.getShopVO();
			shopVO.setShopCd(shopService.getMaxCode()+1);
			result = shopService.insert(shopVO);
			if(result == 0){
				return false;
			}
		}

		return roleDetailUserService.insert(userInfoVO) != 0;
	}

	// 아이디 중복체크 API
	@GetMapping("/validate/dup/{target}")
	@ResponseBody
	public boolean checkDupId(@PathVariable String target, @RequestParam("value") String value) {
		System.out.println(target);
		System.out.println(value);
		switch (target) {
			case "id":
				return accountService.getAccountById(value) == null;
			case "email":
				return accountService.getAccountByEmail(value) == null;
		}
		return false;
	}

	@PostMapping("/validate/bno")
	@ResponseBody
	public JSONObject validateBusinessNumber(@RequestBody JSONObject data) {
		return BusinessmanApiUtil.validate(JSONObject.toJSONString(data));
	}
}
