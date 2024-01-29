package com.momo.controller;

import com.momo.service.AlarmService;
import com.momo.util.SecurityContextUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/alarm")
public class AlarmController {
	private final AlarmService alarmService;

	@GetMapping("")
	public String homeAlarm(Model model){
		String username = SecurityContextUtil.getUsername();
		Map<String,Object> selectMap = new HashMap<>();
		selectMap.put("receiver_id", username);
		model.addAttribute("list_alarm", alarmService.select(selectMap));
		return "layout/alarm";
	}

	@PostMapping("/get")
	@ResponseBody
	public List<Map<String,Object>> getAlarm(@RequestBody Map<String,Object> map){
		return alarmService.select(map);
	}

	@PostMapping("/count")
	@ResponseBody
	public int countAlarm(@RequestBody Map<String,Object> map){
		return alarmService.select(map).size();
	}

	@PostMapping("/read/all")
	@ResponseBody
	public boolean readAlarmList(@RequestBody List<Integer> alarmList){
		return alarmService.readAll(alarmList) == alarmList.size();
	}
}