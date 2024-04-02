package com.momo.restcontroller;

import com.momo.common.response.AuthResponse;
import com.momo.provider.JwtProvider;
import com.momo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/account")
public class RestAccountController {
	private final UserService userService;
	private final PasswordEncoder passwordEncoder;

	@PostMapping("/login")
	public ResponseEntity<AuthResponse> login(@RequestBody Map<String,String> user){
		String username = user.get("username");
		String password = user.get("password");

		Authentication authentication = authenticate(username, password);
		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = JwtProvider.generateToken(authentication);
		AuthResponse authResponse = new AuthResponse();

		authResponse.setMessage("Login Success");
		authResponse.setJwt(token);
		authResponse.setStatus(true);

		return new ResponseEntity<>(authResponse, HttpStatus.OK);
	}

	private Authentication authenticate(String username, String password){
		UserDetails userDetails = userService.loadUserByUsername(username);

		if(userDetails == null){
			System.out.println("Login details - null "+userDetails);
			throw new BadCredentialsException("Invalid username and password");
		}

		if(!passwordEncoder.matches(password, userDetails.getPassword())){
			System.out.println("Login userDetails - password mismatch"+userDetails);
			throw new BadCredentialsException("Invalid password");
		}
		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}
}
