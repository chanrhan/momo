package com.momo.api;

import com.momo.common.util.SecurityContextUtil;
import com.momo.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
	private final UserService userService;
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
}
