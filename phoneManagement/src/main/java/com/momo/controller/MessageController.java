package com.momo.controller;

import com.momo.service.EmployeeService;
import com.momo.service.MsgFormService;
import com.momo.service.MsgReserveService;
import com.momo.service.ShopService;
import com.momo.util.SecurityContextUtil;
import com.momo.vo.CommonVO;
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
	private final EmployeeService   employeeService;
	private final MsgReserveService msgReserveService;
	private final MsgFormService    msgFormService;

	private final ShopService shopService;

	@GetMapping("")
	public String msgHome() {
		return "message/msg_home";
	}

	@GetMapping("/reserve")
	public String reserveMsgForm(Model model) {
		String              username = SecurityContextUtil.getUsername();
		Map<String, Object> empMap   = employeeService.selectById(username);


		List<Map<String, Object>> list_shop = shopService.selectByUser(empMap);
		Map<String, Object> shop = list_shop.get(0);

		List<Map<String,Object>> list_msg;
		if (empMap.get("role").equals("REPS")) {
			list_msg = msgReserveService.selectByBNo(empMap.get("b_no").toString());
		}
		else {
			list_msg = msgReserveService.selectByShopCode(empMap.get("shop_cd").toString());
		}

		//		model.addAttribute("list_msg", messageService.getReservedMessage(MessageVO.builder().shopCd(shop.getShopCd()).build()));
		model.addAttribute("list_msg", list_msg);
		model.addAttribute("list_shop", list_shop);
		model.addAttribute("selected_shop", shop);
		return "message/msg_reserve";
	}

	@PostMapping("/reserve")
	@ResponseBody
	public boolean reserveMsgPOST(@RequestBody Map<String,Object> map) {
		return msgReserveService.reserve(map) != 0;
	}

	@GetMapping("/send")
	public String sendMsg() {
		return "message/msg_send";
	}

	@PostMapping("/list/srch")
	@ResponseBody
	public List<Map<String,Object>> searchMessage(@RequestBody CommonVO commonVO) {

		return msgReserveService.search(commonVO);
	}

	@PostMapping("/delete/{id}")
	@ResponseBody
	public boolean deleteMessage(@RequestBody Map<String,Object> map) {
		return msgReserveService.delete(map) != 0;
	}

	@PostMapping("/update/{id}")
	@ResponseBody
	public boolean updateMessage(@RequestBody Map<String,Object> map) {
		return msgReserveService.update(map) != 0;
	}
}
