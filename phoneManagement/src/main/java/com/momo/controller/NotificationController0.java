package com.momo.controller;

import com.momo.service.NotificationService;
import com.momo.common.util.ResponseEntityUtil;
import com.momo.common.util.SecurityContextUtil;
import com.momo.common.vo.NotifVO;
import com.momo.common.vo.SearchVO;
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
@RequestMapping("/alarm")
@PreAuthorize("isAuthenticated()")
public class NotificationController0 {
	private final NotificationService notificationService;

	@GetMapping("")
	public String homeAlarm(Model model){
		String username = SecurityContextUtil.getUsername();

		System.out.println("username: "+username);
		model.addAttribute("list_alarm", notificationService.selectNotifByReceiver(username));
		return "layout/alarm";
	}

	@GetMapping("/list/srch")
	@ResponseBody
	public ResponseEntity<List<Map<String,Object>>> searchAlarm(@RequestBody SearchVO vo){
		return ResponseEntityUtil.okOrNotFound(notificationService.searchNotif(vo));
	}

	@PostMapping("/count")
	@ResponseBody
	public ResponseEntity<Integer> countAlarm(@RequestBody NotifVO vo){
		return ResponseEntityUtil.okOrNotFound(notificationService.selectNotif(vo).size());
	}

	@GetMapping("/read/all")
	@ResponseBody
	public ResponseEntity<Boolean> readAlarmList(@RequestParam String id){
		return ResponseEntityUtil.okOrNotModified(notificationService.readAllByReceiver(id));
	}
}