package com.momo.controller;

import com.momo.auth.RoleAuth;
import com.momo.common.util.BusinessmanApiUtil;
import com.momo.common.util.ResponseEntityUtil;
import com.momo.common.vo.NotificationVO;
import com.momo.common.vo.SearchVO;
import com.momo.common.vo.ShopCommonVO;
import com.momo.common.vo.UserVO;
import com.momo.service.*;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
public class AccountController0 {
	private final UserService userService;

	private final TermService       termService;
	private final ShopCommonService shopCommonService;
	private final RegionService     regionService;

	private final NotificationService notificationService;
	private final ImageService        imageService;


	@GetMapping("/signup")
	public String signup(Model model, @RequestParam(required = false, defaultValue = "") String email, @RequestParam(value = "shop_id", required = false, defaultValue = "0") int shopId, @RequestParam(value = "corp_id", required = false, defaultValue = "0") int corpId) {
		List<Map<String, Object>> list_term = termService.selectTerm(null);
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

	@PostMapping("/submit/common")
	@ResponseBody
	@Transactional
	public ResponseEntity<Boolean> signupSubmit(@RequestBody UserVO vo, HttpSession session) {
		int result = userService.insertUser(vo);
		if (result == 0) {
			return ResponseEntity.notFound().build();
		}
		userService.loginDirectly(vo.getId(), session);

		return ResponseEntity.ok().body(true);
	}

	@PostMapping("/submit/admin")
	@ResponseBody
	@Transactional
	public ResponseEntity<Boolean> submitAdmin(@RequestBody UserVO vo, HttpSession session) {
		//		System.out.println(vo);
		String role   = vo.getRole();
		int    result = userService.updateRole(vo.getId(), role);
		if (result == 0) {
			return ResponseEntity.internalServerError().build();
		}

		session.setAttribute("user_id", vo.getId());

		userService.replaceAuthority(role);

		return ResponseEntity.ok(true);
	}

	@PostMapping("/submit/reps")
	@ResponseBody
	@Transactional
	public ResponseEntity<Boolean> submitReps(HttpSession session, @RequestBody UserVO vo) {
		int result = userService.updateRole(vo.getEmpId(), "REPS");
		if (result == 0) {
			return ResponseEntity.internalServerError().build();
		}

		session.setAttribute("user_id", vo.getEmpId());

		int corpId = shopCommonService.getMaxCorpId() + 1;
		vo.setCorpId(corpId);

		result = shopCommonService.insertCorp(vo.toCorpVO());
		if (result == 0) {
			return ResponseEntity.internalServerError().build();
		}

		result = userService.insertEmp(vo);

		Integer shopId = vo.getShopId();
		if (shopId != null && shopId != 0) {
			result = shopCommonService.updateShop(ShopCommonVO.builder().shopId(shopId).corpId(corpId).build());
			if (result == 0) {
				return ResponseEntity.internalServerError().build();
			}
			result = userService.updateEmp(UserVO.builder().corpId(corpId).build());
			if (result == 0) {
				return ResponseEntity.internalServerError().build();
			}
		}

		session.setAttribute("shop_id", 0);
		session.setAttribute("corp_id", corpId);

		notificationService.approvalRequestToAdmin(vo.getEmpId(), corpId);

		userService.replaceAuthority("REPS");
		return ResponseEntity.ok(true);
	}

	@PostMapping("/submit/manager")
	@ResponseBody
	@Transactional
	public ResponseEntity<Boolean> submitManager(HttpSession session, @RequestBody UserVO vo) {
		int result = userService.updateRole(vo.getEmpId(), "MANAGER");
		if (result == 0) {
			return ResponseEntity.internalServerError().build();
		}

		int shopId = vo.getShopId();
		int corpId = vo.getCorpId();
		//		if(corpId == 0){
		//			vo.setApprovalSt(true);
		//		}
		//		boolean approve = vo.getApprovalSt();

		result = userService.insertEmp(vo);
		if (result == 0) {
//			throw new RestApiException(CommonErrorCode.INSERT_ERROR, "INSERT EMPLOYEE");
			return ResponseEntity.internalServerError().build();
		}

		if (corpId != 0) {
			notificationService.approvalRequestToReps(vo.getEmpId(), corpId, shopId);
		}
		else {
			result = shopCommonService.insertShop(vo.toShopVO());
		}


		session.setAttribute("user_id", vo.getEmpId());
		session.setAttribute("shop_id", shopId);
		session.setAttribute("corp_id", corpId);

		userService.replaceAuthority("MANAGER", vo.getApprovalSt());

		return ResponseEntity.ok(result != 0);
	}

	// 아이디 중복체크 API
	@GetMapping("/validate/dup/{target}")
	@ResponseBody
	public ResponseEntity<Boolean> isDuplicated(@PathVariable String target, @RequestParam String value) {
		return switch (target) {
			case "id" -> ResponseEntity.ok(userService.selectUserById(value) == null);
			case "email" -> ResponseEntity.ok(userService.selectUserByEmail(value) == null);
			default -> ResponseEntity.badRequest().build();
		};
	}

	@PostMapping("/pfp/update")
	@ResponseBody
	public ResponseEntity<Boolean> updatePfp(@RequestPart String userId, @RequestPart MultipartFile mf) {
		String pfpPath = imageService.upload("pfp", mf);
		return ResponseEntityUtil.okOrNotModified(userService.updatePfp(UserVO.builder().id(userId).pfp(pfpPath).build()));
	}

	@PostMapping("/validate/bno")
	@ResponseBody
	public ResponseEntity<Map<String, Object>> validateBusinessNumber(@RequestBody Map<String, Object> map) {
		return ResponseEntityUtil.okOrNotFound(BusinessmanApiUtil.validate(map));
	}

	@PostMapping("/approve")
	@ResponseBody
	@Transactional
	public ResponseEntity<Boolean> approve(@RequestBody NotificationVO vo) {
		String receiverId = vo.getReceiverId();
		int    result     = userService.updateApproval(receiverId, true);
		if (result == 0) {
			return ResponseEntity.internalServerError().build();
		}

		Map<String, Object> emp = userService.selectEmpById(receiverId);
		if (emp.get("role").equals("REPS")) {
			int corpId = Integer.parseInt(emp.get("corp_id").toString());
			result = shopCommonService.updateCorpPoint(corpId, 5000);
			if (result == 0) {
				return ResponseEntity.internalServerError().build();
			}

			String title   = "포인트 지급";
			String content = "최초 회원가입으로 인한 5000포인트가 지급되었습니다. 문자, 카톡 250건을 무료로 발송 가능합니다.";

			notificationService.sendMessage("admin", receiverId, title, content);
		}

		return ResponseEntityUtil.okOrNotModified(notificationService.approve(vo.getAlarmId()));
	}

	@PostMapping("/list/chat/invitable")
	@ResponseBody
	public ResponseEntity<List<Map<String, Object>>> searchChatInvitableUsers(@RequestBody SearchVO vo, HttpSession session) {
		if (vo.getSelect() == null) {
			vo.setSelect(new HashMap<>());
		}
		vo.getSelect().put("corp_id", session.getAttribute("corp_id").toString());
		//		System.out.println("invitable chat : "+vo);
		return ResponseEntityUtil.okOrNotFound(userService.searchChatInvitableUser(vo));
	}

	@PostMapping("/find/id/tel")
	@ResponseBody
	public ResponseEntity<List<Map<String, Object>>> tryFindUserIdByTel(@RequestBody UserVO vo) {
		return ResponseEntityUtil.okOrNotFound(userService.tryFindUserIdByTel(vo));
	}

	@PostMapping("/find/id/email")
	@ResponseBody
	public ResponseEntity<List<Map<String, Object>>> tryFindUserIdByEmail(@RequestBody UserVO vo) {
		return ResponseEntityUtil.okOrNotFound(userService.tryFindUserIdByEmail(vo));
	}


}
