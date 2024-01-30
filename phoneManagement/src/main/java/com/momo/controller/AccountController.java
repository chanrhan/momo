package com.momo.controller;

import com.momo.service.*;
import com.momo.util.BusinessmanApiUtil;
import com.momo.vo.SearchVO;
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
	private final UserService userService;

	private final EmployeeService employeeService;

	private final TermService   termService;
	private final ShopService   shopService;
	private final CorpService   corpService;
	private final RegionService regionService;

	private final AlarmService alarmService;

	@GetMapping("/login")
	public String login() {
		return "account/login";
	}

//	@PreAuthorize("isAnonymous()")
	@GetMapping("/signup")
	public String signup(Model model) {
		List<Map<String,Object>> list_term = termService.selectAll();
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
//		if (!state.equals("") && !city.equals("")) {
//			String         keyword = state + " " + city;
//			Paging<ShopVO> paging  = shopService.selectPage(page, "shop_addr", keyword);
//			model.addAttribute("paging", paging);
//			model.addAttribute("list_city", regionService.selectByState(state).split(","));
//		}
//
//		model.addAttribute("list_state", regionService.selectAllState());
//		model.addAttribute("state", state);
//		model.addAttribute("city", city);
//		model.addAttribute("q", q);

		return "account/role_manager";
	}

	@PreAuthorize("isAuthenticated()")
	@GetMapping("/role/customer")
	public String roleCustomer(Model model) {
		return "account/role_customer";
	}

	@PostMapping("/submit")
	@ResponseBody
	public boolean signupSubmit(@RequestBody Map<String ,Object> map) {
		return userService.insert(map) != 0;
	}

	@PostMapping("/submit/role")
	@ResponseBody
	public boolean roleSubmit(@RequestBody Map<String,Object> map) {
		System.out.println(map);
		int result = userService.updateRole(map);
		if (result == 0) {
			return false;
		}
		String role = map.get("role").toString();

		userService.replaceAuthority(role);

		if (role.equals("REPS")) {
			result = corpService.insert(map);
			if(result == 0){
				return false;
			}
		}

		if (role.equals("REPS") || role.equals("MANAGER")) {
			result = employeeService.insert(map);
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
				return userService.getAccountById(value) == null;
			case "email":
				return userService.getAccountByEmail(value) == null;
		}
		return false;
	}

	@PostMapping("/validate/bno")
	@ResponseBody
	public JSONObject validateBusinessNumber(@RequestBody JSONObject data) {
		JSONObject j = BusinessmanApiUtil.validate(JSONObject.toJSONString(data));
		System.out.println(j);
		return j;
	}

	@GetMapping("/city")
	@ResponseBody
	public String[] getCity(@RequestParam String state) {
		String cities = regionService.selectByState(state);
		return cities.split(",");
	}

	@PostMapping("/search/corp")
	@ResponseBody
	public List<Map<String,Object>> searchCorp(@RequestBody SearchVO searchVO){
		return shopService.search(searchVO);
	}

	@PostMapping("/approve")
	@ResponseBody
	public boolean approve(@RequestBody Map<String, Object> map){
		Map<String, Object> userMap = employeeService.selectOne(map);

		userMap.put("approve_st", true);
		int result = employeeService.update(userMap);
		if(result == 0){
			return false;
		}

		return alarmService.approve(Integer.parseInt(map.get("alarm_id").toString())) != 0;
	}

	//	@PostMapping("/search/shop")
	//	@ResponseBody
	//	public List<ShopVO> searchShopByAddress(@RequestBody RegionVO regionVO){
	////		System.out.println(regionVO);
	//		return shopService.searchByRegion(regionVO);
	//	}


}
