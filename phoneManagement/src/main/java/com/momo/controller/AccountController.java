package com.momo.controller;

import com.momo.auth.RoleAuth;
import com.momo.emitter.NotificationService;
import com.momo.service.*;
import com.momo.util.BusinessmanApiUtil;
import com.momo.util.SecurityContextUtil;
import com.momo.vo.AlarmVO;
import com.momo.vo.SearchVO;
import com.momo.vo.ShopCommonVO;
import com.momo.vo.UserCommonVO;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
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
	private final RegionService       regionService;
	private final NotificationService notificationService;

	private final AlarmService alarmService;

	@GetMapping("/login")
	public String login() {
		return "account/login";
	}


	@GetMapping("/signup")
	public String signup(Model model,
						 @RequestParam(required = false, defaultValue = "") String email,
						 @RequestParam(value = "shop_id", required = false, defaultValue = "0") int shopId,
						 @RequestParam(value = "corp_id", required = false, defaultValue = "0") int corpId) {
		List<Map<String,Object>> list_term = termService.selectTerm(null);
		model.addAttribute("terms", list_term);
		model.addAttribute("email", email);
		model.addAttribute("shop_id", shopId);
		model.addAttribute("corp_id", corpId);
		return "account/signup";
	}


	@GetMapping("/role/reps")
	@RoleAuth(role = RoleAuth.Role.NONE)
	public String roleReps(Model model) {
		model.addAttribute("list_state", regionService.selectAllState());

		return "account/role_reps";
	}


	@GetMapping("/role")
	@RoleAuth(role = RoleAuth.Role.NONE)
	public String roleSelect(Model model) {
		return "account/role_select";
	}


	@GetMapping("/role/manager")
	@RoleAuth(role = RoleAuth.Role.NONE)
	public String roleManager() {
		return "account/role_manager";
	}


	@GetMapping("/role/customer")
	@RoleAuth(role = RoleAuth.Role.NONE)
	public String roleCustomer(Model model) {
		return "account/role_customer";
	}

	@PostMapping("/submit")
	@ResponseBody
	@Transactional
	public boolean signupSubmit(@RequestBody UserCommonVO vo, HttpSession session) {
		int result = userCommonService.insertUser(vo);
		if(result == 0){
			return false;
		}
		userCommonService.loginWithoutForm(vo.getId(), session);

		return result != 0;
	}

	@PostMapping("/submit/admin")
	@ResponseBody
	@Transactional
	public boolean submitAdmin(@RequestBody UserCommonVO vo, HttpSession session) {
//		System.out.println(vo);
		String role = vo.getRole();
		int result = userCommonService.updateRole(vo.getId(), role);
		if (result == 0) {
			return false;
		}

		session.setAttribute("user_id", vo.getId());
		userCommonService.replaceAuthority(role);

		return result != 0;
	}

	@PostMapping("/submit/reps")
	@ResponseBody
	@Transactional
	public boolean submitReps(HttpSession session, @RequestBody UserCommonVO vo) {
		int result = userCommonService.updateRole(vo.getEmpId(), "REPS");
		if (result == 0) {
			return false;
		}

		session.setAttribute("user_id", vo.getEmpId());

		int corpId = shopCommonService.getMaxCorpId()+1;
		vo.setCorpId(corpId);
		vo.setShopId(0);

		result = shopCommonService.insertCorp(vo.toShopCommonVO());
		if(result == 0){
			return false;
		}

		result = userCommonService.insertEmp(vo);

		Integer shopId = vo.getShopId();
		if(shopId != null && shopId != 0){
			result = shopCommonService.updateShop(ShopCommonVO.builder().shopId(shopId).corpId(corpId).build());
			if(result == 0){
				return false;
			}
		}

		session.setAttribute("shop_id", 0);
		session.setAttribute("corp_id", corpId);

		notificationService.approvalRequestToAdmin(vo.getEmpId(), corpId);

		userCommonService.replaceAuthority("REPS");
		return result != 0;
	}

	@PostMapping("/submit/manager")
	@ResponseBody
	@Transactional
	public boolean submitManager(HttpSession session, @RequestBody UserCommonVO vo) {
		int result = userCommonService.updateRole(vo.getEmpId(), "MANAGER");
		if (result == 0) {
			return false;
		}

		session.setAttribute("user_id", vo.getEmpId());

		result = userCommonService.insertEmp(vo);

		int shopId = vo.getShopId();
		int corpId = vo.getCorpId();
		session.setAttribute("shop_id", shopId);
		session.setAttribute("corp_id", corpId);

		boolean approve = vo.getApprovalSt();
		if(!approve){
			notificationService.approvalRequestToReps(vo.getEmpId(), corpId, shopId);
		}
		userCommonService.replaceAuthority("MANAGER", vo.getApprovalSt());

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
	public List<Map<String,Object>> searchShop( @RequestBody SearchVO vo){
		return shopCommonService.searchShopByRole(vo);
	}

	@PostMapping("/approve")
	@ResponseBody
	@Transactional
	public boolean approve(@RequestBody AlarmVO vo){
		String receiverId = vo.getReceiverId();
		int result = userCommonService.updateApproveState(receiverId, true);
		if(result == 0){
			return false;
		}

		Map<String,Object> emp = userCommonService.selectEmpById(receiverId);
		if(emp.get("role").equals("REPS")){
			int corpId = Integer.parseInt(emp.get("corp_id").toString());
			result = shopCommonService.updateCorpPoint(corpId, 5000);
			if(result == 0){
				return false;
			}

			String title = "포인트 지급";
			String content ="최초 회원가입으로 인한 5000포인트가 지급되었습니다. 문자, 카톡 250건을 무료로 발송 가능합니다.";

			notificationService.sendMessage("admin", receiverId, title, content);
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
