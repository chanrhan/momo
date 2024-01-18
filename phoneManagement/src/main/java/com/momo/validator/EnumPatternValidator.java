package com.momo.validator;

import com.momo.enums.ValidEnum;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

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
