package com.momo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@RequestMapping("/msg")
@PreAuthorize("isAuthenticated()")
@Deprecated
public class MessageController0 {
//	private final UserService      userService;
//	private final MsgCommonService msgCommonService;
//	private final ShopService shopService;
//
//	@PostMapping("/form/create")
//	@ResponseBody
//	public boolean createMessageForm(@RequestBody MsgCommonVO vo){
//		return false;
//	}
//
//	@PostMapping("/list/srch")
//	@ResponseBody
//	public ResponseEntity<List<Map<String,Object>>> searchMessage(@RequestBody SearchVO searchVO, HttpSession session) {
//		return ResponseEntityUtil.okOrNotFound(msgCommonService.searchMsg(searchVO));
//	}
//
//	@PostMapping("/delete/{id}")
//	@ResponseBody
//	public ResponseEntity<Boolean> deleteMessage(@PathVariable int id) {
//		return ResponseEntityUtil.okOrNotModified(msgCommonService.deleteMsgReserve(id));
//	}
//
//	@PostMapping("/regi/tel")
//	@ResponseBody
//	public ResponseEntity<Boolean> registrateSendTel(@RequestBody ShopVO vo){
//		return ResponseEntityUtil.okOrNotModified(shopService.updateSendTel(vo));
//	}
//

}
