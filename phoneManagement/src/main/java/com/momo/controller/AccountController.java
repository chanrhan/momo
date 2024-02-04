package com.momo.controller;

import com.momo.service.*;
import com.momo.util.BusinessmanApiUtil;
import com.momo.vo.AlarmVO;
import com.momo.vo.SearchVO;
import com.momo.vo.UserCommonVO;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/account")
public class AccountController {
	private final UserCommonService userCommonService;

	private final TermService       termService;
	private final ShopCommonService shopCommonService;
	private final RegionService regionService;

	private final AlarmService alarmService;

	@GetMapping("/login")
	public String login() {
		return "account/login";
	}

//	@PreAuthorize("isAnonymous()")
	@GetMapping("/signup")
	public String signup(Model model) {
		List<Map<String,Object>> list_term = termService.selectTerm(null);
		model.addAttribute("terms", list_term);
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
		model.addAttribute("list_state", regionService.selectAllState());

		return "account/role_reps";
	}

	@PreAuthorize("isAuthenticated()")
	@GetMapping("/role/manager")
	public String roleManager() {
		return "account/role_manager";
	}

	@PreAuthorize("isAuthenticated()")
	@GetMapping("/role/customer")
	public String roleCustomer(Model model) {
		return "account/role_customer";
	}

	@PostMapping("/submit")
	@ResponseBody
	public boolean signupSubmit(@RequestBody UserCommonVO vo) {
		return userCommonService.insertUser(vo) != 0;
	}

	@PostMapping("/submit/admin")
	@ResponseBody
	public boolean submitAdmin(@RequestBody UserCommonVO vo) {
		System.out.println(vo);
		String role = vo.getRole();
		int result = userCommonService.updateRole(vo.getId(), role);
		if (result == 0) {
			return false;
		}
		userCommonService.replaceAuthority(role);

		return result != 0;
	}

	@PostMapping("/submit/role")
	@ResponseBody
	public boolean submitRole(@RequestBody UserCommonVO vo) {
		System.out.println(vo);
		String role = vo.getRole();
		int result = userCommonService.updateRole(vo.getEmpId(), role);
		if (result == 0) {
			return false;
		}

		userCommonService.replaceAuthority(role);

		if (role.equals("REPS")) {
			result = shopCommonService.insertCorp(vo.toShopCommonVO());
			if(result == 0){
				return false;
			}
		}

		if (role.equals("REPS") || role.equals("MANAGER")) {
			result = userCommonService.insertEmp(vo);
		}

		return result != 0;
	}

	// 아이디 중복체크 API
	@GetMapping("/validate/dup/{target}")
	@ResponseBody
	public boolean checkDupId(@PathVariable String target, @RequestParam("value") String value) {
		//		System.out.println(target);
		//		System.out.println(value);
		switch (target) {
			case "id":
				return userCommonService.selectUserById(value) == null;
			case "email":
				return userCommonService.selectUserByEmail(value) == null;
		}
		return false;
	}

	@PostMapping("/validate/bno")
	@ResponseBody
	public Map<String,Object> validateBusinessNumber(@RequestBody Map<String,Object> map) {
//		String startDt = map.get("businesses").toString().replace("-","");
//		map.put("start_dt",startDt);
		System.out.println("before: "+map);
		Map<String,Object> j = BusinessmanApiUtil.validate(map);
		System.out.println("after: "+j);
		return j;
	}

	@GetMapping("/city")
	@ResponseBody
	public String[] getCity(@RequestParam String state) {
		String cities = regionService.selectByState(state);
		return cities.split(",");
	}

	@PostMapping("/search/shop")
	@ResponseBody
	public List<Map<String,Object>> searchShop(@RequestBody SearchVO vo){
		return shopCommonService.searchShop(vo);
	}

	@PostMapping("/approve")
	@ResponseBody
	public boolean approve(@RequestBody AlarmVO vo){
		int result = userCommonService.updateApproveState(vo.getSenderId(), true);
		if(result == 0){
			return false;
		}

		return alarmService.approve(vo.getAlarmId()) != 0;
	}

	//	@PostMapping("/search/shop")
	//	@ResponseBody
	//	public List<ShopVO> searchShopByAddress(@RequestBody RegionVO regionVO){
	////		System.out.println(regionVO);
	//		return shopService.searchByRegion(regionVO);
	//	}


}
