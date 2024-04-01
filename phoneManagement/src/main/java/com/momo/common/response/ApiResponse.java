package com.momo.common.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ApiResponse<T> {
	private final T      result;
	private final int    code;
	private final String message;

	@Builder
	public ApiResponse(final T result, final int code, final String message) {
		this.result  = result;
		this.code    = code;
		this.message = message;
	}
}
