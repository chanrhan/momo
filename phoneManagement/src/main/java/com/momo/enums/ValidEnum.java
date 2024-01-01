package com.momo.enums;

import com.momo.validator.EnumPatternValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = EnumPatternValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidEnum {
	String message() default "Invalid value. This is not permitted";
	Class<?>[] groups() default {};
	Class<? extends Payload>[] payload() default {};
	Class<? extends java.lang.Enum<?>> enumClass();
}
