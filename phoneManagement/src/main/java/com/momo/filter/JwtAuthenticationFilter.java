package com.momo.filter;

import com.momo.common.response.JwtResponse;
import com.momo.provider.JwtTokenProvider;
import com.momo.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.StringUtils;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
	private final JwtTokenProvider jwtTokenProvider;
	private final JwtService jwtService;
//	public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider) {
//		this.jwtTokenProvider = jwtTokenProvider;
//	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
		String token = resolveToken((HttpServletRequest) request);

		if(token != null && jwtTokenProvider.validateToken(token)){
			Authentication authentication = jwtTokenProvider.getAuthentication(token);
//			SecurityContextHolder.getContext().setAuthentication(authentication);
			log.info("attempt auth token");
			return authentication;
		}
		log.info("attempt error");
		return null;
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
		log.info("{} - successfulAuthentication -> 인증 완료", this.getClass());


		JwtResponse jwtResponse = jwtTokenProvider.generateToken(authentication);
//		Long userNo = principalDetails.getUser().getUserNo();
		jwtService.saveRefreshToken(jwtResponse);

		jwtTokenProvider.setHeaderJwtToken(response, jwtResponse);
	}

	private String resolveToken(HttpServletRequest request){
		log.info("resolve token");
		String bearerToken = request.getHeader("Authorization");
		if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")){
			return bearerToken.substring(7);
		}
		return null;
	}
}
