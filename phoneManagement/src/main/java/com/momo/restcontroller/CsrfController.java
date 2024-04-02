package com.momo.restcontroller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class CsrfController {
	@GetMapping("/csrf")
	public CsrfToken getCsrfToken(CsrfToken csrfToken){
		log.info("csrf Token: "+ csrfToken);
		return csrfToken;
	}
}
