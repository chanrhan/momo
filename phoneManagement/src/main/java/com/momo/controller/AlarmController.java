package com.momo.controller;

import com.momo.service.AlarmService;
import com.momo.util.SecurityContextUtil;
import com.momo.vo.AlarmVO;
import com.momo.vo.SearchVO;
import lombok.RequiredArgsConstructor;
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
public class AlarmController {
	private final AlarmService alarmService;

	@GetMapping("")
	public String homeAlarm(Model model){
		String username = SecurityContextUtil.getUsername();

		System.out.println("username: "+username);
		model.addAttribute("list_alarm", alarmService.selectAlarmByReceiver(username));
		return "layout/alarm";
	}

	@GetMapping("/list/srch")
	@ResponseBody
	public List<Map<String,Object>> searchAlarm(@RequestBody SearchVO vo){
		return alarmService.searchAlarm(vo);
	}

	@PostMapping("/count")
	@ResponseBody
	public int countAlarm(@RequestBody AlarmVO vo){
		return alarmService.selectAlarm(vo).size();
	}

	@GetMapping("/read/all")
	@ResponseBody
	public boolean readAlarmList(@RequestParam String id){
		return alarmService.readAllByReceiver(id) != 0;
	}
}