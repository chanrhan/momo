import {useEffect} from "react";
import {ObjectUtils} from "../../utils/objectUtil";
import {NumberInput} from "./NumberInput";

export function PriceInput({id, _ref, className, name, value, onChange, readOnly, placeholder, maxLength=20}){

    const addComma = ()=>{
        if(ObjectUtils.isEmpty(value) || !Number(value)){
            return null
        }
        return Number(value)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    const explicitComma = (e)=>{
        const v = e.target.value;
        e.target.value = v.replaceAll(",","")
        return e;
    }

    const handleInput = (e)=>{
        e = explicitComma(e);
        if(!Number.isNaN(Number(e.target.value))){
            onChange(e)
        }
    }



    return (
    <input type="text" id={id} name={name}
           ref={_ref}
           className={`ta_r ${className}`}
           maxLength={maxLength}
           value={addComma() ?? ''} onChange={handleInput}
           readOnly={readOnly}
           placeholder={placeholder}/>
)
}