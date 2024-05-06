package com.momo.api;

import com.momo.common.util.SecurityContextUtil;
import com.momo.common.vo.UserVO;
import com.momo.service.ImageService;
import com.momo.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
	private final UserService userService;
	private final ImageService imageService;

	@GetMapping("/info")
	public ResponseEntity<Map<String,Object>> fetchUserInfo(){
		String username = SecurityContextUtil.getUsername();
		return ResponseEntity.ok(userService.getUserById(username));
	}

	@PutMapping("/info")
	public ResponseEntity<?> updateUserInfo(@RequestBody UserVO vo){
		String username = SecurityContextUtil.getUsername();
		vo.setId(username);
		return ResponseEntity.ok(userService.updateUser(vo));
	}

	@PutMapping("/nickname")
	public ResponseEntity<?> updateNickname(@RequestParam String nickname){
		String username = SecurityContextUtil.getUsername();
		return ResponseEntity.ok(userService.updateNickname(username, nickname));
	}

	@PutMapping("/shop")
	public ResponseEntity<?> updateCurrentShop(@RequestParam int id) {
		String username = SecurityContextUtil.getUsername();
		return ResponseEntity.ok(userService.updateCurrentShop(username, id) != 0);
	}

	@GetMapping("/pfp/{id}")
	@ResponseBody
	public ResponseEntity<byte[]> downloadPfpImage(@PathVariable String id) throws IOException {
//		log.info("request pfp : {}", id);
		String path = userService.getPfpFilePath(id);
//		log.info("pfp path : {}", path);
		if(!StringUtils.hasText(path)){
			return ResponseEntity.status(HttpStatus.OK).body(null);
		}
		return imageService.download("pfp",path);
	}

	@PutMapping("/pfp")
	public ResponseEntity<?> updatePfp(@RequestPart MultipartFile file) {
		String username = SecurityContextUtil.getUsername();
		String path = imageService.upload("pfp", file);
		if(!StringUtils.hasText(path)){
			return ResponseEntity.internalServerError().build();
		}
		return ResponseEntity.ok(userService.updatePfp(UserVO.builder().id(username).pfp(path).build()) != 0);
	}

	@PutMapping("/password")
	public ResponseEntity<?> updatePassword(@RequestBody UserVO vo){
		String username = SecurityContextUtil.getUsername();
		vo.setId(username);
		return ResponseEntity.ok(userService.updatePassword(vo) != 0);
	}

	@GetMapping("/staff")
	public ResponseEntity<List<Map<String,Object>>> getStaffList(){
		String username = SecurityContextUtil.getUsername();
		return ResponseEntity.ok(userService.getUserAsStaff(username));
	}

}
