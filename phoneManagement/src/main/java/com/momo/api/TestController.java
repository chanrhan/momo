package com.momo.api;

import com.momo.alimtalk.ImageAlimTalk;
import com.momo.alimtalk.SENSUtil;
import com.momo.common.enums.codes.CommonErrorCode;
import com.momo.common.vo.SaleVO;
import com.momo.exception.RestApiException;
import com.momo.service.ImageService;
import com.momo.service.NotificationService;
import com.momo.service.RegionService;
import com.momo.service.SaleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/v1/test")
@RequiredArgsConstructor
@Slf4j
public class TestController {
	private final NotificationService notificationService;
	private final SaleService saleService;
	private final ImageService imageService;
	private final RegionService regionService;

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

	@GetMapping("/sale")
	public ResponseEntity<List<Map<String,Object>>> getSale(@RequestParam(defaultValue = "1")String  shopId){
		return ResponseEntity.ok(saleService.getSaleByShopId(SaleVO.builder().shopId(shopId).build()));
	}

	@GetMapping("/exception")
	public ResponseEntity<?> getException(@RequestParam int code, @RequestParam String reason){
		throw new RestApiException(CommonErrorCode.fromInt(code), reason);
	}

	@PostMapping("/img")
	@ResponseBody
	public ResponseEntity<String> upload(@RequestParam String dir, @RequestPart(value = "file") MultipartFile file) {
		log.info("dir: {}, file: {}", dir, file.getName());
		return ResponseEntity.ok(imageService.upload(dir, file));
	}

	@PostMapping("/alimtalk")
	public ResponseEntity<ImageAlimTalk> sendAlimTalk(@RequestBody Map<String,String> map) throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException {

		ResponseEntity<ImageAlimTalk> result = SENSUtil.sendWithRestTemplate(map);
		log.info("status: {}",result.getStatusCode());
		log.info("headers: {}",result.getHeaders());
		log.info("b0dy: {}",result.getBody());
		return result;
//		return ResponseEntity.ok(SENSUtil.send(map));
	}
}
