package com.momo.controller;

import com.momo.auth.RoleAuth;
import com.momo.service.*;
import com.momo.util.BusinessmanApiUtil;
import com.momo.vo.NotificationVO;
import com.momo.vo.SearchVO;
import com.momo.vo.ShopCommonVO;
import com.momo.vo.UserVO;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/account")
public class AccountController {
	private final UserService userService;

	private final TermService       termService;
	private final ShopCommonService shopCommonService;
	private final RegionService       regionService;

	private final NotificationService notificationService;
	private final ImageService imageService;

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
	public boolean signupSubmit(@RequestBody UserVO vo, HttpSession session) {
		int result = userService.insertUser(vo);
		if(result == 0){
			return false;
		}
		userService.loginDirectly(vo.getId(), session);

		return result != 0;
	}

	@PostMapping("/submit/admin")
	@ResponseBody
	@Transactional
	public boolean submitAdmin(@RequestBody UserVO vo, HttpSession session) {
//		System.out.println(vo);
		String role = vo.getRole();
		int result = userService.updateRole(vo.getId(), role);
		if (result == 0) {
			return false;
		}

		session.setAttribute("user_id", vo.getId());

		userService.replaceAuthority(role);

		return result != 0;
	}

	@PostMapping("/submit/reps")
	@ResponseBody
	@Transactional
	public boolean submitReps(HttpSession session, @RequestBody UserVO vo) {
		int result = userService.updateRole(vo.getEmpId(), "REPS");
		if (result == 0) {
			return false;
		}

		session.setAttribute("user_id", vo.getEmpId());

		int corpId = shopCommonService.getMaxCorpId()+1;
		vo.setCorpId(corpId);

		result = shopCommonService.insertCorp(vo.toCorpVO());
		if(result == 0){
			return false;
		}

		result = userService.insertEmp(vo);

		Integer shopId = vo.getShopId();
		if(shopId != null && shopId != 0){
			result = shopCommonService.updateShop(ShopCommonVO.builder().shopId(shopId).corpId(corpId).build());
			if(result == 0){
				return false;
			}
			result = userService.updateEmp(UserVO.builder().corpId(corpId).build());
			if(result == 0){
				return false;
			}
		}

		session.setAttribute("shop_id", 0);
		session.setAttribute("corp_id", corpId);

		notificationService.approvalRequestToAdmin(vo.getEmpId(), corpId);

		userService.replaceAuthority("REPS");
		return result != 0;
	}

	@PostMapping("/submit/manager")
	@ResponseBody
	@Transactional
	public boolean submitManager(HttpSession session, @RequestBody UserVO vo) {
		int result = userService.updateRole(vo.getEmpId(), "MANAGER");
		if (result == 0) {
			return false;
		}

		int shopId = vo.getShopId();
		int corpId = vo.getCorpId();
//		if(corpId == 0){
//			vo.setApprovalSt(true);
//		}
//		boolean approve = vo.getApprovalSt();

		result = userService.insertEmp(vo);
		if(result == 0){
			return false;
		}

		if(corpId != 0) {
			notificationService.approvalRequestToReps(vo.getEmpId(), corpId, shopId);
		}else {
			result = shopCommonService.insertShop(vo.toShopVO());
		}


		session.setAttribute("user_id", vo.getEmpId());
		session.setAttribute("shop_id", shopId);
		session.setAttribute("corp_id", corpId);

		userService.replaceAuthority("MANAGER", vo.getApprovalSt());

		return result != 0;
	}

	// 아이디 중복체크 API
	@GetMapping("/validate/dup/{target}")
	@ResponseBody
	public boolean isDuplicated(@PathVariable String target, @RequestParam String value) {
		//		System.out.println(target);
		//		System.out.println(value);
		switch (target) {
			case "id":
				return userService.selectUserById(value) == null;
			case "email":
				return userService.selectUserByEmail(value) == null;
		}
		return false;
	}

	@PostMapping("/pfp/update")
	@ResponseBody
	public boolean updatePfp(@RequestPart String userId,
							 @RequestPart MultipartFile mf){
		String pfpPath = imageService.upload("pfp", mf);
		return userService.updatePfp(UserVO.builder().id(userId).pfp(pfpPath).build()) != 0;
	}

	@PostMapping("/validate/bno")
	@ResponseBody
	public Map<String,Object> validateBusinessNumber(@RequestBody Map<String,Object> map) {
		return BusinessmanApiUtil.validate(map);
	}

	@PostMapping("/approve")
	@ResponseBody
	@Transactional
	public boolean approve(@RequestBody NotificationVO vo){
		String receiverId = vo.getReceiverId();
		int result = userService.updateApproval(receiverId, true);
		if(result == 0){
			return false;
		}

		Map<String,Object> emp = userService.selectEmpById(receiverId);
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

		return notificationService.approve(vo.getAlarmId()) != 0;
	}

	@PostMapping("/list/chat/invitable")
	@ResponseBody
	public List<Map<String,Object>> searchChatInvitableUsers(@RequestBody SearchVO vo, HttpSession session){
		if(vo.getSelect() == null){
			vo.setSelect(new HashMap<>());
		}
		vo.getSelect().put("corp_id", session.getAttribute("corp_id").toString());
//		System.out.println("invitable chat : "+vo);
		return userService.searchChatInvitableUser(vo);
	}

	@PostMapping("/find/id/tel")
	@ResponseBody
	public List<Map<String,Object>> tryFindUserIdByTel(@RequestBody UserVO vo){
		return userService.tryFindUserIdByTel(vo);
	}

	@PostMapping("/find/id/email")
	@ResponseBody
	public List<Map<String,Object>> tryFindUserIdByEmail(@RequestBody UserVO vo){
		return userService.tryFindUserIdByEmail(vo);
	}


}
