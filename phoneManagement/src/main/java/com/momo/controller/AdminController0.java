package com.momo.controller;

import com.momo.auth.RoleAuth;
import com.momo.service.AdminService;
import com.momo.service.ShopCommonService;
import com.momo.service.UserService;
import com.momo.common.util.ResponseEntityUtil;
import com.momo.common.vo.SearchVO;
import com.momo.common.vo.ShopCommonVO;
import com.momo.common.vo.UserVO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin")
@PreAuthorize("isAuthenticated()")
public class AdminController0 {
	private final AdminService      adminService;
	private final UserService       userService;
	private final ShopCommonService shopCommonService;

	@GetMapping("/home")
	@RoleAuth(role = RoleAuth.Role.ADMIN)
	public String adminHome(){
		return "admin/home";
	}

	@GetMapping("/member")
	@RoleAuth(role = RoleAuth.Role.ADMIN)
	public String members(Model model){
		List<Map<String,Object>> list_corp = shopCommonService.selectCorp(new ShopCommonVO());
		Map<String,Object> selectedCorp = null;
		if(list_corp != null && !list_corp.isEmpty()){
			selectedCorp = list_corp.get(0);
//			int corpId = Integer.parseInt(selectedCorp.get("corp_id").toString());
			List<Map<String,Object>> list_user = userService.selectUserInfo(new UserVO());
			model.addAttribute("list_user",list_user);
		}
		model.addAttribute("selected_corp", selectedCorp);
		model.addAttribute("list_corp", list_corp);

		return "admin/member";
	}

	@PostMapping("/user/list")
	@ResponseBody
	public ResponseEntity<List<Map<String,Object>>> searchUserInfo(@RequestBody SearchVO vo){
		return ResponseEntityUtil.okOrNotFound(userService.searchUserInfo(vo));
	}

}
