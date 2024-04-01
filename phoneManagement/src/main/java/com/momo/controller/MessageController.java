package com.momo.controller;

import com.momo.auth.RoleAuth;
import com.momo.service.MsgCommonService;
import com.momo.service.ShopCommonService;
import com.momo.service.UserService;
import com.momo.common.util.ResponseEntityUtil;
import com.momo.common.vo.MsgCommonVO;
import com.momo.common.vo.SearchVO;
import com.momo.common.vo.ShopCommonVO;
import jakarta.servlet.http.HttpSession;
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
@RequestMapping("/msg")
@PreAuthorize("isAuthenticated()")
public class MessageController {
	private final UserService      userService;
	private final MsgCommonService msgCommonService;
	private final ShopCommonService shopCommonService;

	@GetMapping("/home")
	@RoleAuth(role = RoleAuth.Role.EMPLOYEE)
	public String msgHome() {
		return "message/msg_home";
	}

	@GetMapping("/reserve")
	@RoleAuth(role = RoleAuth.Role.EMPLOYEE)
	public String reserveMsgForm(Model model, HttpSession session) {
		List<Map<String, Object>> list_shop = shopCommonService.selectShopBySession(session);

		List<Map<String,Object>> list_msg = null;
		Map<String, Object> selecedShop = null;
		if(list_shop != null && !list_shop.isEmpty()){
			selecedShop = list_shop.get(0);
			list_msg = msgCommonService.selectMsgBySession(session);
		}
		model.addAttribute("list_msg", list_msg);
		model.addAttribute("selected_shop", selecedShop);
		model.addAttribute("list_shop", list_shop);

		return "message/msg_reserve";
	}

	@PostMapping("/reserve")
	@ResponseBody
	public ResponseEntity<Boolean> reserveMsgPOST(@RequestBody MsgCommonVO vo) {
		return msgCommonService.reserve(vo);
	}

	@GetMapping("/detail")
	@RoleAuth(role = RoleAuth.Role.EMPLOYEE)
	public String msgDetail(Model model,
							@RequestParam int shopId,
							@RequestParam int msgId) {
		model.addAttribute("msg",msgCommonService.selectMsg(MsgCommonVO.builder()
																	.shopId(shopId)
																	.msgId(msgId)
																	.build()).get(0));
		return "message/msg_detail";
	}

	@GetMapping("/send")
	@RoleAuth(role = RoleAuth.Role.EMPLOYEE)
	public String sendMsg(Model model, HttpSession session) {
		Map<String,Object> shop = shopCommonService.selectShopBySession(session).get(0);
		model.addAttribute("shop",shop);
		return "message/msg_send";
	}

	@GetMapping("/form")
	@RoleAuth(role = RoleAuth.Role.EMPLOYEE)
	public String msgForm() {
		return "message/form";
	}

	@GetMapping("/form/create")
	public String createForm(){

		return "message/form_create";
	}

	@PostMapping("/form/create")
	@ResponseBody
	public boolean createMessageForm(@RequestBody MsgCommonVO vo){
		return false;
	}

	@PostMapping("/list/srch")
	@ResponseBody
	public ResponseEntity<List<Map<String,Object>>> searchMessage(@RequestBody SearchVO searchVO, HttpSession session) {
		return ResponseEntityUtil.okOrNotFound(msgCommonService.searchMsg(searchVO));
	}

	@PostMapping("/delete/{id}")
	@ResponseBody
	public ResponseEntity<Boolean> deleteMessage(@PathVariable int id) {
		return ResponseEntityUtil.okOrNotModified(msgCommonService.deleteMsgReserve(id));
	}

	@PostMapping("/regi/tel")
	@ResponseBody
	public ResponseEntity<Boolean> registrateSendTel(@RequestBody ShopCommonVO vo){
		return ResponseEntityUtil.okOrNotModified(shopCommonService.updateSendTel(vo));
	}


}
