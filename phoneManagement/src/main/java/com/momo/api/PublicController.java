package com.momo.api;

import com.momo.common.response.JwtVO;
import com.momo.common.util.ResponseEntityUtil;
import com.momo.common.vo.UserVO;
import com.momo.provider.JwtProvider;
import com.momo.service.JwtService;
import com.momo.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/public")
public class PublicController {
	private final UserService userService;
	private final JwtProvider jwtProvider;
	private final JwtService jwtService;

	@PostMapping("/signup")
	@Transactional
	public ResponseEntity<?> signup(HttpServletResponse response, HttpSession session, @RequestBody UserVO vo){
		int result = userService.insertUser(vo);
		if (result == 0) {
			return ResponseEntity.notFound().build();
		}

		Authentication authentication = userService.loginDirectly(vo.getId(), session);
		JwtVO          jwtVO          = jwtProvider.generateToken(authentication);

		jwtService.saveRefreshToken(jwtVO);
		jwtProvider.setHeaderJwtToken(response, jwtVO);

		return ResponseEntity.ok().body(true);
	}

	// 아이디 중복체크 API
	@GetMapping("/exist/{target}")
	public ResponseEntity<Boolean> existsValue(@PathVariable String target, @RequestParam String value) {
		return switch (target) {
			case "id" -> ResponseEntity.ok(userService.selectUserById(value) != null);
			case "email" -> ResponseEntity.ok(userService.selectUserByEmail(value) != null);
			default -> ResponseEntity.badRequest().build();
		};
	}

	@GetMapping("/get/tel-email/secret")
	public ResponseEntity<Map<String,Object>> getTelEmailSecretly(@RequestParam String id){
		return ResponseEntity.ok(userService.getTelEmailSecretly(id));
	}

	@PostMapping("/match/tel")
	public ResponseEntity<Boolean> matchUserIdTel(@RequestBody UserVO vo){
		return ResponseEntity.ok(userService.matchUserIdTel(vo));
	}

	@PostMapping("/match/email")
	public ResponseEntity<Boolean> matchUserIdEmail(@RequestBody UserVO vo){
		return ResponseEntity.ok(userService.matchUserIdEmail(vo));
	}

	@PostMapping("/find/id/tel")
	public ResponseEntity<List<Map<String, Object>>> tryFindUserIdByTel(@RequestBody UserVO vo) {
		return ResponseEntityUtil.okOrNotFound(userService.tryFindUserIdByTel(vo));
	}

	@PostMapping("/find/id/email")
	public ResponseEntity<List<Map<String, Object>>> tryFindUserIdByEmail(@RequestBody UserVO vo) {
		return ResponseEntityUtil.okOrNotFound(userService.tryFindUserIdByEmail(vo));
	}
}
