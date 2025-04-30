import {useEffect} from "react";
import {NumberInput} from "./NumberInput";

export function TelePhoneInput({id, _ref, className, name, value, onChange, readOnly, placeholder}){
    const regex = /^[0-9-]{0,13}$/

    const checkValue = ()=>{
        if(regex.test(value)){
            return value;
        }
        return ''
    }

    const formatTelphoneNumber = (input)=>{
        // 1) 숫자만 추출, 2) 최대 11자리로 자르기 (한국 휴대폰 기준)
        const digits = input.replace(/\D/g, "").slice(0, 11);

        if (digits.length <= 3) {
            // 0~3자리: 그대로
            return digits;
        }
        if (digits.length <= 7) {
            // 4~7자리: 3-나머지
            return `${digits.slice(0, 3)}-${digits.slice(3)}`;
        }
        // 8자리 이상: 3-4-나머지
        return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
    }

    const handleInput = e=>{
        const value = e.target.value;
        //
        // if(!regex.test(value)){
        //     return
        // }
        // // const digits = value.replace(/\D/g, "").slice(0, 11);
        // if (value.length === 10) {
        //     e.target.value = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        // }else if(value.length >= 11 && value.length <= 13){
        //     e.target.value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        // }
        e.target.value = formatTelphoneNumber(value);
        onChange(e)
    }

    return (
        <input type='text' id={id} name={name}
               ref={_ref}
               className={className}
               maxLength={13}
               value={checkValue()} onChange={handleInput}
               readOnly={readOnly}
               placeholder={placeholder}/>
    )
}