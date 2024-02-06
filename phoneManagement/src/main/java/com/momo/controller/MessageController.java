package com.momo.controller;

import com.momo.service.MsgCommonService;
import com.momo.service.ShopCommonService;
import com.momo.service.UserCommonService;
import com.momo.util.SecurityContextUtil;
import com.momo.vo.MsgCommonVO;
import com.momo.vo.SearchVO;
import com.momo.vo.SupportVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/msg")
public class MessageController {
	private final UserCommonService userCommonService;
	private final MsgCommonService  msgCommonService;
	private final ShopCommonService shopCommonService;

	@GetMapping("/home")
	public String msgHome() {
		return "message/msg_home";
	}

	@GetMapping("/reserve")
	public String reserveMsgForm(Model model) {
		List<Map<String, Object>> list_shop = shopCommonService.selectShopByUser();
		List<Map<String,Object>> list_msg = msgCommonService.selectMsgByUser();

		model.addAttribute("list_msg", list_msg);
		model.addAttribute("list_shop", list_shop);
		model.addAttribute("selected_shop", list_shop.get(0));
		return "message/msg_reserve";
	}

	@PostMapping("/reserve")
	@ResponseBody
	public boolean reserveMsgPOST(@RequestBody MsgCommonVO vo) {
		System.out.println(vo);
		return msgCommonService.reserve(vo) != 0;
	}

	@GetMapping("/detail/{id}")
	public String msgDetail(Model model, @PathVariable int id) {
		model.addAttribute("msg",msgCommonService.selectMsgById(id));
		return "message/msg_detail";
	}

	@GetMapping("/send")
	public String sendMsg() {
		return "message/msg_send";
	}

	@PostMapping("/list/srch")
	@ResponseBody
	public List<Map<String,Object>> searchMessage(@RequestBody SearchVO searchVO) {
		return msgCommonService.searchMsgByUser(searchVO);
	}

	@PostMapping("/delete/{id}")
	@ResponseBody
	public boolean deleteMessage(@PathVariable int id) {
		return msgCommonService.deleteMsgReserve(id) != 0;
	}

//	@PostMapping("/update")
//	@ResponseBody
//	public boolean updateMessage(@RequestBody MsgCommonVO vo) {
//		return msgCommonService.updateMsg(vo) != 0;
//	}
}
