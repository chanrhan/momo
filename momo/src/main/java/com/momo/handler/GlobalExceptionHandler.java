package com.momo.handler;

import com.momo.common.response.ErrorResponse;
import com.momo.exception.BusinessException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
	@ExceptionHandler(BusinessException.class)
	public ResponseEntity<?> handleRestApiException(BusinessException e){
		ErrorResponse res = ErrorResponse.of(e);
		log.error("BusinessException: {}", res);
		return ResponseEntity.status(res.getStatus()).body(res.getBody());
	}

	@ExceptionHandler(NullPointerException.class)
	public ResponseEntity<ErrorResponse> handleNullPointerException(NullPointerException e){
		log.error("NullPointerException: {}", e);
		return ResponseEntity.notFound().build();
	}
}
