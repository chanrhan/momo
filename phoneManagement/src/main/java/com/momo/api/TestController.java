package com.momo.api;

import com.momo.common.vo.SaleVO;
import com.momo.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

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

	@PostMapping("/multipart")
	public ResponseEntity<?> multipartTest(@RequestPart(value = "sale", required = false)SaleVO vo,
										   @RequestPart MultipartFile file,
										   MultipartHttpServletRequest request){
		log.info("sale: {}",vo);
		log.info("files: {}",file);
		log.info("req files: {}",request.getFile("file"));
		System.out.println("sys files: "+file);
		if(file == null){
			return ResponseEntity.badRequest().build();
		}

		return ResponseEntity.ok().build();
	}
}
