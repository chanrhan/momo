package com.momo.api;

import com.momo.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;


@RestController
@RequestMapping("/api/v1/test")
@RequiredArgsConstructor
@Slf4j
public class TestController {
	private final NotificationService notificationService;

	@PostMapping("/send")
	public ResponseEntity<?> sendTest(@RequestBody Map<String,Object> map){
		String senderId = "admin";
		log.info("test send map: {}",map);
		String receiverId = map.get("receiver_id").toString();
		String content = map.get("content").toString();
		String noteTp = map.get("notif_tp").toString();
		if(noteTp.equals("message")){
			notificationService.sendMessage(senderId, receiverId, content);
		}else{
			notificationService.approvalRequestToReps(senderId, 1, 1);
		}
		return ResponseEntity.ok().build();
	}
}
