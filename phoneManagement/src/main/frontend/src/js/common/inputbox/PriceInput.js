import {useEffect} from "react";
import {ObjectUtils} from "../../utils/objectUtil";

export function PriceInput({id, className, name, value, onChange, readOnly, placeholder}){

    const addComma = ()=>{
        if(ObjectUtils.isEmpty(value)){
            return null
        }
        return Number(value)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    const handlePress = (e)=>{
        const v = e.target.value;
        e.target.value = v.replaceAll(",","")
        if(!Number.isNaN(Number(e.target.value))){
            onChange(e)
        }
    }

    return (
        <input type="text" id={id} name={name}
               className={`ta_r ${className}`}
               maxLength={13}
               value={addComma() ?? ''} onChange={handlePress}
               readOnly={readOnly}
               placeholder={placeholder}/>
    )
}