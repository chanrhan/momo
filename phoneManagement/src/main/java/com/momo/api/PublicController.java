package com.momo.api;

import com.momo.common.response.JwtVO;
import com.momo.common.util.BusinessmanApiUtil;
import com.momo.common.vo.ShopVO;
import com.momo.common.vo.UserVO;
import com.momo.provider.JwtProvider;
import com.momo.service.JwtService;
import com.momo.service.ShopService;
import com.momo.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/public")
public class PublicController {
	private final UserService userService;
	private final ShopService shopService;
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
	@GetMapping("/user/id/{userId}/exist")
	public ResponseEntity<Boolean> existUserId(@PathVariable String userId) {
		return ResponseEntity.ok(userService.existUserId(userId));
	}

	@GetMapping("/user/email/{email}/exist")
	public ResponseEntity<Boolean> existEmail(@PathVariable String email) {
		return  ResponseEntity.ok(userService.existEmail(email));
	}

	@GetMapping("/user/tel-email/protected")
	public ResponseEntity<Map<String,Object>> getProtectedTelAndEmail(@RequestParam String id){
		return ResponseEntity.ok(userService.getProtectedTelAndEmail(id));
	}

	@GetMapping("/user/{userId}/match")
	public ResponseEntity<Boolean> matchUserId(@PathVariable String userId,
												  @RequestParam(required = false)String tel,
												  @RequestParam(required = false)String email){
		UserVO vo = UserVO.builder().id(userId).tel(tel).email(email).build();
		return ResponseEntity.ok(userService.matchUserId(vo));
	}

	@GetMapping("/user")
	public ResponseEntity<Map<String,Object>> findUser(@RequestParam(required = true)String name,
													   @RequestParam(required = false)String tel,
													@RequestParam(required = false)String email) {
		UserVO vo = UserVO.builder().name(name).tel(tel).email(email).build();
		List<Map<String,Object>> list = userService.getUser(vo);
		if(list == null || list.isEmpty()){
			return ResponseEntity.ok(null);
		}
		return ResponseEntity.ok(list.get(0));
	}

	@GetMapping("/shop")
	public ResponseEntity<List<Map<String,Object>>> getShop(@RequestParam(required = false)String keyword){
		ShopVO vo = ShopVO.builder().keyword(keyword).build();
		return ResponseEntity.ok(shopService.getShop(vo));
	}

	@PostMapping("/bpno/validate")
	public ResponseEntity<?> validateBusinessNumber(@RequestBody Map<String, String> map) {
//		log.info("validate bno: {}",map);
		String name = userService.getUserByBpNo(map.get("bp_no"));
		if(StringUtils.hasText(name)){
			return ResponseEntity.ok(name);
		}



		return ResponseEntity.ok(BusinessmanApiUtil.validate(map) == null ? 0 : 1);
	}

}
