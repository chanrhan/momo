package com.momo.common.response;

import com.momo.common.enums.codes.ErrorCode;
import com.momo.exception.CommonException;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ErrorResponse {
	private final LocalDateTime timestamp = LocalDateTime.now();
	private       int    status;
	private       String        code;
	private List<FieldError> errors;
	private String message;
	private String reason;

	public ErrorResponse(final ErrorCode commonErrorCode){
		this.status = commonErrorCode.getStatus();
		this.code = commonErrorCode.name();
		this.message = commonErrorCode.getMessage();
		this.errors = new ArrayList<>();
	}

	public ErrorResponse(final ErrorCode commonErrorCode, final String reason){
		this.status = commonErrorCode.getStatus();
		this.code = commonErrorCode.name();
		this.message = commonErrorCode.getMessage();
		this.reason = reason;
	}

	public ErrorResponse(final ErrorCode commonErrorCode, final List<FieldError> errors){
		this.status = commonErrorCode.getStatus();
		this.code = commonErrorCode.name();
		this.message = commonErrorCode.getMessage();
		this.errors = errors;
	}

	public static ErrorResponse of(final ErrorCode code){
		return new ErrorResponse(code);
	}

	public static ErrorResponse of(final ErrorCode code, final BindingResult bindingResult){
		return new ErrorResponse(code, FieldError.of(bindingResult));
	}

	public static ErrorResponse of(final ErrorCode code, final String reason) {
		return new ErrorResponse(code, reason);
	}

	public static ErrorResponse of(final CommonException e){
		return of(e.getErrorCode(), e.getReason());
	}

	public static ResponseEntity<ErrorResponse> response(CommonException e){
		return ResponseEntity.status(e.getErrorCode().getStatus()).body(of(e.getErrorCode()));
	}


	@Getter
	public static class FieldError{
		private final String field;
		private final String value;
		private final String reason;

		public static List<FieldError> of(final String field, final String value, final String reason){
			List<FieldError> fieldErrors = new ArrayList<>();
			fieldErrors.add(new FieldError(field, value, reason));
			return fieldErrors;
		}

		private static List<FieldError> of(final BindingResult bindingResult){
			final List<org.springframework.validation.FieldError> fieldErrors = bindingResult.getFieldErrors();
			return fieldErrors.stream()
					.map(error -> new FieldError(
							error.getField(),
							error.getRejectedValue() == null ? "" : error.getRejectedValue().toString(),
							error.getDefaultMessage()))
					.collect(Collectors.toList());
		}

		@Builder
		FieldError(String field, String value, String reason){
			this.field = field;
			this.value = value;
			this.reason = reason;
		}
	}

}
