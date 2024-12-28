package com.momo.api;

import com.momo.common.response.JwtVO;
import com.momo.common.vo.LoginVO;
import com.momo.common.vo.UserVO;
import com.momo.provider.JwtProvider;
import com.momo.service.CommonService;
import com.momo.service.JwtService;
import com.momo.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {
	private final JwtService  jwtService;
	private final JwtProvider jwtProvider;
	private final CommonService commonService;


	@PostMapping("/refresh")
	public ResponseEntity<?> refresh(HttpSession session,
									 HttpServletResponse response,
									 @RequestHeader(value = "X-REFRESH-TOKEN", required = true)String bearerRefreshToken, @RequestBody LoginVO vo) throws AccessDeniedException {
		log.info("refresh");
		JwtVO jwtVO = jwtService.refresh(bearerRefreshToken, vo.isRememberMe());
		log.info("jwt: {}", jwtVO);
		commonService.setCurrentShopId(session);

		jwtProvider.setHeaderAccessToken(response, jwtVO.getAccessToken());

		return  ResponseEntity.status(HttpStatus.OK).build();
	}

	@PostMapping("/token/reset-pwd")
	public ResponseEntity<?> tokenForResetPassword(@RequestBody UserVO vo){
		JwtVO jwtVO = jwtProvider.generateTokenForResetPassword(vo.getId());
		if(jwtVO == null){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		return ResponseEntity.ok("Bearer "+jwtVO.getAccessToken());
	}


}
