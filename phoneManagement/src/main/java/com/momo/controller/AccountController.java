package com.momo.controller;

import com.momo.domain.Paging;
import com.momo.service.*;
import com.momo.util.BusinessmanApiUtil;
import com.momo.vo.RegionVO;
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
	private final ShopService   shopService;
	private final RegionService regionService;

	@GetMapping("/login")
	public String login() {
		return "account/login";
	}

	@PreAuthorize("isAnonymous()")
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
		model.addAttribute("list_state", regionService.selectAllState());

		return "account/role_reps";
	}

	@PreAuthorize("isAuthenticated()")
	@GetMapping("/role/manager")
	public String roleManager(Model model,
							  @RequestParam(defaultValue = "") String state,
							  @RequestParam(defaultValue = "") String city,
							  @RequestParam(defaultValue = "") String q,
							  @RequestParam(defaultValue = "1") int page){
		if(!state.equals("") && !city.equals("")){
			String keyword = state + " " + city + " " + q;
			Paging<ShopVO> paging = shopService.selectPage(page,"shopAddr", keyword);
			model.addAttribute("paging", paging);
		}

		model.addAttribute("list_state", regionService.selectAllState());
		model.addAttribute("state",state);
		model.addAttribute("city",city);
		model.addAttribute("q",q);

		return "account/role_manager";
	}

	@PreAuthorize("isAuthenticated()")
	@GetMapping("/role/customer")
	public String roleCustomer(Model model) {

		return "account/role_customer";
	}

	@PostMapping("/submit")
	@ResponseBody
	public boolean signupSubmit(@RequestBody UserInfoVO userInfoVO) {
//		System.out.println(userInfoVO);
		int result = accountService.insert(userInfoVO);
		if(result == 0 ) return false;

		accountService.loginWithSignup(userInfoVO.getId());
		return true;
	}

	@PostMapping("/submit/role")
	@ResponseBody
	public boolean roleSubmit(@RequestBody UserInfoVO userInfoVO){
//		System.out.println(userInfoVO);
		int result = 0;
		result = accountService.updateRole(userInfoVO);
		if(result == 0){
			return false;
		}
		accountService.replaceAuthority(userInfoVO.getRole());

		String role = userInfoVO.getRole();
		if (role.equals("REPS")) {
			userInfoVO.setShopCd(shopService.getMaxCode()+1);
			ShopVO shopVO = userInfoVO.getShopVO();
			result = shopService.insert(shopVO);
			if(result == 0){
				return false;
			}
		}

		if(!role.equals("ADMIN")){
			result = roleDetailUserService.insert(userInfoVO);
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

	@GetMapping("/city")
	@ResponseBody
	public String[] getCity(@RequestParam String state){
		String cities = regionService.selectByState(state);
		return cities.split(",");
	}

	@PostMapping("/search/shop")
	@ResponseBody
	public List<ShopVO> searchShopByAddress(@RequestBody RegionVO regionVO){
//		System.out.println(regionVO);
		return shopService.searchByRegion(regionVO);
	}


}
