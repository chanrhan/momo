package com.momo.controller;

import com.momo.service.MsgCommonService;
import com.momo.service.ShopCommonService;
import com.momo.service.UserCommonService;
import com.momo.util.SecurityContextUtil;
import com.momo.vo.MsgCommonVO;
import com.momo.vo.SearchVO;
import com.momo.vo.ShopCommonVO;
import com.momo.vo.UserCommonVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/msg")
public class MessageController {
	private final UserCommonService userCommonService;
	private final MsgCommonService  msgCommonService;
	private final ShopCommonService shopCommonService;

	@GetMapping("")
	public String msgHome() {
		return "message/msg_home";
	}

	@GetMapping("/reserve")
	public String reserveMsgForm(Model model) {
		String              username = SecurityContextUtil.getUsername();

		List<Map<String, Object>> list_shop = shopCommonService.selectShopByUser(username);
		List<Map<String,Object>> list_msg = msgCommonService.selectMsgReserveByUser(username);

		model.addAttribute("list_msg", list_msg);
		model.addAttribute("list_shop", list_shop);
		model.addAttribute("selected_shop", list_shop.get(0));
		return "message/msg_reserve";
	}

	@PostMapping("/reserve")
	@ResponseBody
	public boolean reserveMsgPOST(@RequestBody MsgCommonVO vo) {
		return msgCommonService.reserve(vo) != 0;
	}

	@GetMapping("/send")
	public String sendMsg() {
		return "message/msg_send";
	}

	@PostMapping("/list/srch")
	@ResponseBody
	public List<Map<String,Object>> searchMessage(@RequestBody SearchVO searchVO) {
		return msgCommonService.searchMsgReserve(searchVO);
	}

	@PostMapping("/delete/{id}")
	@ResponseBody
	public boolean deleteMessage(@PathVariable int id) {
		return msgCommonService.deleteMsgReserve(id) != 0;
	}

	@PostMapping("/update")
	@ResponseBody
	public boolean updateMessage(@RequestBody MsgCommonVO vo) {
		return msgCommonService.updateMsgReserve(vo) != 0;
	}
}
