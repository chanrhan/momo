import {cmc} from "../../utils/cm";
import Dashboard from "../../../css/dashboard.module.css";
import {ObjectUtils} from "../../utils/objectUtil";
import {useEffect, useRef, useState} from "react";

export function SelectIndexLayer({initValue, inputField, cssModule, cssModules=[], buttonClassName, className, name, value, onChange, values, children, buttonStyle}){
    const [active, setActive ] = useState(false)
    const componentRef = useRef(null)
    const onclickRef = useRef()

    useEffect(() => {
        if(active){
            attachOnClick();
        }else{
            detachOnClick()
        }
    }, [active]);

    const attachOnClick = ()=>{
        if(window.onclick){
            onclickRef.current = window.onclick;
        }
        const timer = setTimeout(()=>{
            window.onclick = e=>{
                // e.preventDefault()
                if(componentRef.current && !componentRef.current.contains(e.target)){
                    setActive(false)
                    // detachOnClick();
                }
            }
            clearTimeout(timer);
        }, 10)

    }

    const detachOnClick = ()=>{
        if(window.onclick){
            const timer = setTimeout(()=>{
                window.onclick = onclickRef.current;
                onclickRef.current = null;
                clearTimeout(timer)
            }, 10)
        }
    }

    const handleChange = i=>{
        if(onChange){
            onChange(i);
        }else{
            inputField.put(name, i);
        }
    }

    const fromCssModule = key=>{
        if(!ObjectUtils.isEmpty(cssModule)){
            return cssModule[key]
        }
        if(ObjectUtils.isEmpty(cssModules)){
            return ''
        }
        if(cssModules && !Array.isArray(cssModules)){
            return cssModules[key];
        }
        if(cssModules.length === 1){
            return cssModules[0][key];
        }

        return cssModules.map(cm=>cm[key]).join(' ');
    }

    // console.log(inputField.get(name))
    // console.log(`value: ${value}`)

    const getButtonName = ()=>{
        if(!ObjectUtils.isEmpty(value)){
            return value;
        }else if(!ObjectUtils.isEmpty(inputField)) {
            const getValue = inputField.get(name);
            // console.log(`g v : ${getValue}`)
            return !ObjectUtils.isEmpty(getValue) ? values[getValue] : (initValue ?? values[0])
        }
        return values[0]
    }


    if(ObjectUtils.isEmpty(values)){
        return null;
    }

    // if(!value && !inputField && typeof inputField !== "object" || ObjectUtils.isEmpty(values)){
    //     return null;
    // }

    return (
        <>
            <button type="button" className={`select_btn ${buttonClassName} ${fromCssModule('select_btn')}`}
                    onClick={()=>{
                        setActive(!active)
                    }}>{getButtonName()}</button>
            <ul ref={componentRef} className={`select_layer ${fromCssModule('select_layer')} ${className} ${active && `active ${fromCssModule('active')}`}`}>
                {
                    values && values.map((v, i) => {
                        return <li key={i} className={`select_item ${fromCssModule('select_item')}`}>
                            <button type="button" onClick={() => {
                                handleChange(i);
                                setActive(false)
                            }}>{v}</button>
                        </li>
                    })
                }
            </ul>
        </>
    )
}