package com.momo.restcontroller;

import com.momo.common.response.JwtResponse;
import com.momo.provider.JwtTokenProvider;
import com.momo.service.JwtService;
import com.momo.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class RestAccountController {
	private final UserService     userService;
	private final JwtService jwtService;
	private final JwtTokenProvider jwtTokenProvider;
	private final PasswordEncoder passwordEncoder;

	@PostMapping("/login")
	public JwtResponse login(HttpServletResponse response, @RequestBody Map<String, String> user) {
		String username = user.get("username");
		String password = user.get("password");

		Authentication authentication = userService.login(username, password);

		JwtResponse jwtResponse = jwtTokenProvider.generateToken(authentication);

		jwtTokenProvider.setHeaderJwtToken(response, jwtResponse);

//		return new ResponseEntity<>(jwtResponse, HttpStatus.OK);
		return jwtResponse;
	}

	@PostMapping("/refresh")
	public JwtResponse refresh(HttpServletRequest request,
							   HttpServletResponse response,
							   @RequestHeader(value = "X-REFRESH-TOKEN", required = true)String bearerRefreshToken) throws AccessDeniedException {
		JwtResponse jwtResponse = jwtService.refresh(bearerRefreshToken);

		jwtTokenProvider.setHeaderJwtToken(response, jwtResponse);

//		return new ResponseEntity<>(jwtResponse, HttpStatus.OK);
		return jwtResponse;
	}


}
