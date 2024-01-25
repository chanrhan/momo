package com.momo.controller;

import com.momo.service.AccountService;
import com.momo.service.EmployeeService;
import com.momo.service.MessageService;
import com.momo.service.ShopService;
import com.momo.util.SecurityContextUtil;
import com.momo.vo.MessageVO;
import com.momo.vo.ShopVO;
import com.momo.vo.UserInfoVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/msg")
public class MessageController {
	private final EmployeeService employeeService;
	private final MessageService messageService;

	private final ShopService shopService;

	@GetMapping("")
	public String msgHome(){
		return "message/msg_home";
	}

	@GetMapping("/reserve")
	public String reserveMsg(Model model){
		String username = SecurityContextUtil.getUsername();
		UserInfoVO emp = employeeService.selectOne(UserInfoVO.builder().id(username).build());

		List<MessageVO> list_msg;
		if(emp.getRole().equals("REPS")){
			list_msg = messageService.getReservedMessageByBno(emp.getBNo());
		}else{
			list_msg = messageService.getReservedMessage(MessageVO.builder().shopCd(emp.getShopCd()).build());
		}

		model.addAttribute("list_msg", list_msg);

		List<ShopVO> list_shop = shopService.getShopByUser(emp);
		ShopVO shop = list_shop.get(0);

		model.addAttribute("list_shop", list_shop);
		model.addAttribute("selected_shop", shop);
		return "message/msg_reserve";
	}

	@GetMapping("/send")
	public String sendMsg(){
		return "message/msg_send";
	}

	@PostMapping("/list/srch")
	@ResponseBody
	public List<MessageVO> searchMessage(@RequestBody MessageVO messageVO){
		return messageService.search(messageVO);
	}
}
