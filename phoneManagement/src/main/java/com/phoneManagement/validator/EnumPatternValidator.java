package com.phoneManagement.validator;

import com.phoneManagement.enums.ValidEnum;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

public class EnumPatternValidator implements ConstraintValidator<ValidEnum, Enum<?>> {
	private ValidEnum annotation;
	@Override
	public void initialize(ValidEnum constraintAnnotation) {
		this.annotation = constraintAnnotation;
	}

	@Override
	public boolean isValid(Enum value, ConstraintValidatorContext constraintValidatorContext) {
		Enum<?>[] enumValues = this.annotation.enumClass().getEnumConstants();
		if(enumValues != null){
			for(Enum<?> enumValue : enumValues){
				if(value == enumValue){
					return true;
				}
			}
		}
		return false;
	}
}
