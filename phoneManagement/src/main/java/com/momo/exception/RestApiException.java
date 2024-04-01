package com.momo.exception;

import com.momo.common.enums.codes.ErrorCode;
import lombok.Getter;

@Getter
public class RestApiException extends CommonException {
	public RestApiException(ErrorCode errorCode) {
		super(errorCode);
	}
	public RestApiException(ErrorCode errorCode, String reason) {
		super(errorCode, reason);
	}
}
