import {cmc} from "../../utils/cm";
import Dashboard from "../../../css/dashboard.module.css";
import {ObjectUtils} from "../../utils/objectUtil";
import {useEffect, useRef, useState} from "react";

export function SelectOptionInputLayer({initValue, value, inputField, cssModules, className, name, values, children}){
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
        inputField.put(name, values[i]);
    }

    const fromCssModule = key=>{
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

    const getButtonName = ()=>{
        if(!ObjectUtils.isEmpty(value)){
            return value;
        }else if(!ObjectUtils.isEmpty(inputField)){
            const getValue = inputField.getInput(name);
            // console.log(`g v : ${getValue}`)
            return !ObjectUtils.isEmpty(getValue) ? getValue : (initValue ?? values[0])
        }
        return 'NULL'
    }


    if(typeof inputField !== "object" || ObjectUtils.isEmpty(values)){
        return null;
    }

    return (
        <>
            <button type="button" className={`select_btn ${fromCssModule('select_btn')}`}
                    onClick={()=>{
                        setActive(!active)
                    }}>{getButtonName()}</button>
            <ul ref={componentRef} className={`select_layer ${fromCssModule('select_layer')} ${className} ${active && `active ${fromCssModule('active')}`}`}>
                <div className='select_inp_box'>
                    <span className='hint_text'>예시: </span>
                    <input type="text" className='select_inp'/>
                </div>
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