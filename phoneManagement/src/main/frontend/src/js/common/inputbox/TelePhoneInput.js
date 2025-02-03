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

    const handleInput = e=>{
        const value = e.target.value;

        if(!regex.test(value)){
            return
        }
        if (value.length === 10) {
            e.target.value = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        }else if(value.length >= 11 && value.length <= 13){
            e.target.value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        }
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