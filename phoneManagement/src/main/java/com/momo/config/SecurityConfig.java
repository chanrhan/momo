package com.momo.config;

import com.momo.filter.JwtAuthenticationFilter;
import com.momo.filter.JwtAuthorizationFilter;
import com.momo.handler.LogoutSuccessHandler;
import com.momo.provider.JwtTokenProvider;
import com.momo.service.JwtService;
import com.momo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {
	private final UserService userService;
	private final JwtTokenProvider jwtTokenProvider;
	private final JwtService jwtService;
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		http
				.rememberMe(rememberMe -> rememberMe
									.key("key")
									.rememberMeParameter("rememberMe")
									.tokenValiditySeconds(3600*24*30)
									.userDetailsService(userService)
						   )
				.authorizeRequests((authorizeHttpRequests)->authorizeHttpRequests
						// 모든 인증되지 않은 요청들을 허락한다는 의미
//						.requestMatchers(new AntPathRequestMatcher("/**")).permitAll())
						.requestMatchers("/**").permitAll().anyRequest().authenticated())
				// csrf는 토큰을 발행하여 세션으로 등록하는데
				// h2-console은 이러한 기능들이 없기 떄문에 403 오류가 발생하게 된다.
				// 따라서 예외로 처리될 수 있도록 한다. (h2-console 은 csrf 무시)
//				.csrf((csrf)->csrf.ignoringRequestMatchers(new AntPathRequestMatcher("/h2-console/**")))
				.headers((headers)->headers.
						addHeaderWriter(new XFrameOptionsHeaderWriter(XFrameOptionsHeaderWriter.XFrameOptionsMode.SAMEORIGIN)))
				// 로그인 URL 설정
//				.formLogin((formLogin)->formLogin
////								   .loginPage("/index.html")
//						.loginProcessingUrl("/account/login")
//								   .successHandler(new LoginSuccessHandler(userService))
//								   .failureHandler(new LoginFailureHandler())
//						  )
				// 로그아웃 URL 설정
				.logout((logout)-> logout
						.logoutRequestMatcher(new AntPathRequestMatcher("/account/logout"))
						.logoutSuccessUrl("/")
						.logoutSuccessHandler(new LogoutSuccessHandler())
						.invalidateHttpSession(true)
					   );

		http.sessionManagement((httpSecuritySessionManagementConfigurer ->
				httpSecuritySessionManagementConfigurer.maximumSessions(1)
						.maxSessionsPreventsLogin(false)));

		http.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider, jwtService), UsernamePasswordAuthenticationFilter.class);
		http.addFilterBefore(new JwtAuthorizationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);

		http.csrf(AbstractHttpConfigurer::disable);

		return http.build();
	}

//	@Bean
//	CorsConfigurationSource corsConfigurationSource() {
//		return (CorsConfigurationSource) request -> {
//			CorsConfiguration ccfg = new CorsConfiguration();
//			ccfg.setAllowedOrigins(Arrays.asList("*"));
//			ccfg.setAllowedMethods(Collections.singletonList("*"));
//			ccfg.setAllowCredentials(true);
//			ccfg.setAllowedHeaders(Collections.singletonList("*"));
//			ccfg.setExposedHeaders(Arrays.asList("Authorization"));
//			ccfg.setMaxAge(3600L);
//			return ccfg;
//		};
//
//	}

	// AuthenticationManager는 Spring Security의 인증을 담당
	// 사용자 인증 시 앞에서 작성한 UserSecurityService의 PasswordEncoder를 사용한다
	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception{
		return authenticationConfiguration.getAuthenticationManager();
	}



}
