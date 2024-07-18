import {useEffect, useRef, useState} from "react";

export function SelectLayer({top, left, width, className, children, active, setActive}){
    const componentRef = useRef(null)
    const onclickRef = useRef()
    // console.log(`select layer`)


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


    return (
        <ul ref={componentRef} className={`select_layer ${className} ${active && 'active'}`}
            style={{
                position: "absolute",
                top: top,
                left: left,
                width: width
            }}>
            {children}
        </ul>
    )
}

export function SelectItem({className, key, children, onClick}) {
    return (
        <li key={key} className={`select_item ${className}`}>
            <button type="button" className='tool_btn' onClick={onClick}>{children}</button>
        </li>
    )
}