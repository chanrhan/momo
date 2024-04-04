package com.momo.api;

import com.momo.common.response.JwtVO;
import com.momo.provider.JwtProvider;
import com.momo.service.JwtService;
import com.momo.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {
	private final UserService     userService;
	private final JwtService  jwtService;
	private final JwtProvider jwtProvider;

	@PostMapping("/login")
	public ResponseEntity<?> login(HttpServletResponse response, @RequestBody Map<String, String> user) {
		String username = user.get("username");
		String password = user.get("password");

		Authentication authentication = userService.login(username, password);

		JwtVO jwtVO = jwtProvider.generateToken(authentication);

		jwtService.saveRefreshToken(jwtVO);
		jwtProvider.setHeaderJwtToken(response, jwtVO);

		return ResponseEntity.status(HttpStatus.OK).build();
	}

	@PostMapping("/refresh")
	public ResponseEntity<?> refresh(HttpServletRequest request,
						 HttpServletResponse response,
						 @RequestHeader(value = "X-REFRESH-TOKEN", required = true)String bearerRefreshToken) throws AccessDeniedException {
		JwtVO jwtVO = jwtService.refresh(bearerRefreshToken);

		jwtProvider.setHeaderJwtToken(response, jwtVO);

		return  ResponseEntity.status(HttpStatus.OK).build();
	}
}
