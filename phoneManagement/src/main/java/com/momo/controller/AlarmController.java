package com.momo.controller;

import com.momo.service.AlarmService;
import com.momo.vo.AlarmVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/alarm")
public class AlarmController {
	private final AlarmService alarmService;

	@GetMapping("")
	public String homeAlarm(Model model){
		model.addAttribute("list_alarm", alarmService.selectAll());
		return "layout/alarm";
	}

	@GetMapping("/get")
	@ResponseBody
	public List<AlarmVO> getAlarm(@RequestParam String receiver){
		return alarmService.selectByReceiver(AlarmVO.builder().receiverId(receiver).build());
	}

	@GetMapping("/count")
	@ResponseBody
	public int countAlarm(@RequestParam String receiver, @RequestParam boolean readSt){
		return alarmService.selectByReceiver(AlarmVO.builder().receiverId(receiver).readSt(readSt).build()).size();
	}
}
