package com.momo.api;

import com.momo.common.util.SecurityContextUtil;
import com.momo.common.vo.UserVO;
import com.momo.service.ImageService;
import com.momo.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
	private final UserService userService;
	private final ImageService imageService;

	@GetMapping("/common/info")
	public ResponseEntity<Map<String,Object>> getUserCommonInfo(){
		String username = SecurityContextUtil.getUsername();
		return ResponseEntity.ok(userService.getUserSidebarInfo(username));
	}

	@GetMapping("/update/nickname")
	public ResponseEntity<?> updateNickname(@RequestParam String nickname){
		String username = SecurityContextUtil.getUsername();
		return ResponseEntity.ok(userService.updateNickname(username, nickname));
	}

	@GetMapping("/update/shop")
	public ResponseEntity<?> updateCurrentShop(@RequestParam int id){
		String username = SecurityContextUtil.getUsername();
		return ResponseEntity.ok(userService.updateCurrentShop(username, id) != 0);
	}

	@PostMapping("/update/info")
	public ResponseEntity<?> updateUserInfo(@RequestBody UserVO vo){
		String username = SecurityContextUtil.getUsername();
		vo.setId(username);
		return ResponseEntity.ok(userService.updateUser(vo));
	}

	@PostMapping("/update/pfp")
	public ResponseEntity<?> updatePfp(@RequestPart MultipartFile file) {
		String username = SecurityContextUtil.getUsername();
		String path = imageService.upload("pfp", file);
		if(!StringUtils.hasText(path)){
			return ResponseEntity.internalServerError().build();
		}
		return ResponseEntity.ok(userService.updatePfp(UserVO.builder().id(username).pfp(path).build()) != 0);
	}

	@GetMapping("/list/staff")
	public ResponseEntity<List<Map<String,Object>>> getStaffList(){
		String username = SecurityContextUtil.getUsername();
		return ResponseEntity.ok(userService.getStaffList(username));
	}

}
