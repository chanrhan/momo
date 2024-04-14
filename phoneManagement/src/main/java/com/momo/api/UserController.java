package com.momo.api;

import com.momo.common.util.SecurityContextUtil;
import com.momo.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
	private final UserService userService;
	@GetMapping("/common/info")
	public ResponseEntity<Map<String,Object>> getUserCommonInfo(){
		return new ResponseEntity<>(userService.getUserSidebarInfo(), HttpStatus.OK);
	}

	@GetMapping("/update/nickname")
	public ResponseEntity<?> updateNickname(@RequestParam String nickname){
		String username = SecurityContextUtil.getUsername();
		return ResponseEntity.ok(userService.updateNickname(username, nickname));
	}
}
