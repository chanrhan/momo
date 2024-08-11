import {useEffect} from "react";

export function PriceInput({id, className, name, value, onChange, readOnly, placeholder}){

    const addComma = ()=>{
        return Number(value)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    const handlePress = (e)=>{
        const v = e.target.value;
        e.target.value = v.replaceAll(",","")
        onChange(e)
    }

    return (
        <input type="text" id={id} name={name}
               className={className}
               maxLength={13}
               value={addComma() || ''} onChange={handlePress}
               readOnly={readOnly}
               placeholder={placeholder}/>
    )
}