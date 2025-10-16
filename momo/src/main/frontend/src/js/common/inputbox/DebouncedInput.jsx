import {useEffect, useRef, useState} from "react";

export function DebouncedInput({type, placeholder, value, onChange, className, delay = 1000, onDebounced}){

    useEffect(() => {
        const timer = setTimeout(onDebounced, delay)
        return ()=>{
            clearTimeout(timer)
        }
    }, [value]);

    return (
        <input type={type}
               className={className}
               placeholder={placeholder}
               value={value}
               onChange={onChange}
        />
    )
}