package com.momo.service;

import com.momo.common.response.JwtResponse;
import com.momo.mapper.RefreshTokenMapper;
import com.momo.provider.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.AccessDeniedException;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class JwtService {
	private final RefreshTokenMapper refreshTokenMapper;
	private final JwtTokenProvider jwtTokenProvider;

	public void saveRefreshToken(JwtResponse jwtResponse){
		log.info("save refresh token: "+jwtResponse);
		String id = jwtResponse.getUsername();
		String token = jwtResponse.getRefreshToken();
		Map<String,Object> refreshToken = refreshTokenMapper.findById(id);

		if(refreshToken == null){
			refreshTokenMapper.insertRefreshToken(id, token	);
		}else{
			refreshTokenMapper.setRefreshToken(id, token);
		}
	}

	public JwtResponse refresh(String bearerRefreshToken) throws AccessDeniedException {
		String refreshToken = jwtTokenProvider.getBearerTokenToString(bearerRefreshToken);

		if(!jwtTokenProvider.validateToken(refreshToken)){
			throw new AccessDeniedException("AccessDeniedException");
		}

		Map<String,Object> userRefreshToken = refreshTokenMapper.findByRefreshToken(refreshToken);
		if(userRefreshToken == null){
			throw new UsernameNotFoundException("refresh token was not found");
		}

		String username = userRefreshToken.get("user_id").toString();

		Authentication authentication = jwtTokenProvider.getAuthenticationByUsername(username);
		JwtResponse jwtResponse  = jwtTokenProvider.generateToken(authentication);

		saveRefreshToken(jwtResponse);

		return jwtResponse;
	}
}
