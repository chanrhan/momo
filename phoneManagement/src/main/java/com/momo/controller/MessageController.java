package com.momo.controller;

import com.momo.auth.RoleAuth;
import com.momo.service.MsgCommonService;
import com.momo.service.ShopCommonService;
import com.momo.service.UserCommonService;
import com.momo.vo.MsgCommonVO;
import com.momo.vo.SearchVO;
import com.momo.vo.ShopCommonVO;
import lombok.RequiredArgsConstructor;
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
	private final UserCommonService userCommonService;
	private final MsgCommonService  msgCommonService;
	private final ShopCommonService shopCommonService;

	@GetMapping("/home")
	@RoleAuth(role = RoleAuth.Role.EMPLOYEE)
	public String msgHome() {
		return "message/msg_home";
	}

	@GetMapping("/reserve")
	@RoleAuth(role = RoleAuth.Role.EMPLOYEE)
	public String reserveMsgForm(Model model) {
		List<Map<String, Object>> list_shop = shopCommonService.selectShopByContext();

		Map<String, Object> selecedShop = null;
		if(list_shop != null && !list_shop.isEmpty()){
			selecedShop = list_shop.get(0);
			List<Map<String,Object>> list_msg = msgCommonService.selectMsgByContext();
			model.addAttribute("list_msg", list_msg);
		}
		model.addAttribute("selected_shop", selecedShop);
		model.addAttribute("list_shop", list_shop);

		return "message/msg_reserve";
	}

	@PostMapping("/reserve")
	@ResponseBody
	public boolean reserveMsgPOST(@RequestBody MsgCommonVO vo) {
//		System.out.println(vo);
		return msgCommonService.reserve(vo) != 0;
	}

	@GetMapping("/detail/{id}")
	@RoleAuth(role = RoleAuth.Role.EMPLOYEE)
	public String msgDetail(Model model, @PathVariable int id) {
		model.addAttribute("msg",msgCommonService.selectMsgById(id));
		return "message/msg_detail";
	}

	@GetMapping("/send")
	@RoleAuth(role = RoleAuth.Role.EMPLOYEE)
	public String sendMsg(Model model) {
		Map<String,Object> shop = shopCommonService.selectShopByContext().get(0);
		model.addAttribute("shop",shop);
		return "message/msg_send";
	}

	@GetMapping("/form")
	@RoleAuth(role = RoleAuth.Role.EMPLOYEE)
	public String msgForm() {
		return "message/form";
	}

	@PostMapping("/list/srch")
	@ResponseBody
	public List<Map<String,Object>> searchMessage(@RequestBody SearchVO searchVO) {
		return msgCommonService.searchMsgByRole(searchVO);
	}

	@PostMapping("/delete/{id}")
	@ResponseBody
	public boolean deleteMessage(@PathVariable int id) {
		return msgCommonService.deleteMsgReserve(id) != 0;
	}

	@PostMapping("/regi/tel")
	@ResponseBody
	public boolean registrateSendTel(@RequestBody ShopCommonVO vo){
		return shopCommonService.updateSendTel(vo) != 0;
	}


}
