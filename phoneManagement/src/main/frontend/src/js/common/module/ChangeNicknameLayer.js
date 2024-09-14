import {cmc} from "../../utils/cm";
import Dashboard from "../../../css/dashboard.module.css";
import {ObjectUtils} from "../../utils/objectUtil";
import {useEffect, useRef, useState} from "react";
import {useRenderlessModal} from "../../hook/useRenderlessModal";

export function ChangeNicknameLayer({initValue, value, values, onChange}){
    const [custom, setCustom] = useState('')
    const [isCustomSelected, setCustomSelected] = useState(false)

    const renderlessModal = useRenderlessModal("RDL_CHANGENICKNAME")
    // const [active, setActive ] = useState(false)
    // const componentRef = useRef(null)
    // const onclickRef = useRef()
    //
    // useEffect(() => {
    //     if(active){
    //         attachOnClick();
    //     }else{
    //         detachOnClick()
    //         if(isCustomSelected){
    //             onChange(custom);
    //         }
    //     }
    // }, [active]);
    //
    // const attachOnClick = ()=>{
    //     if(window.onclick){
    //         onclickRef.current = window.onclick;
    //     }
    //     const timer = setTimeout(()=>{
    //         window.onclick = e=>{
    //             if(componentRef.current && !componentRef.current.contains(e.target)){
    //                 setActive(false)
    //                 // detachOnClick();
    //             }
    //         }
    //         clearTimeout(timer);
    //     }, 10)
    //
    // }
    //
    // const detachOnClick = ()=>{
    //     if(window.onclick){
    //         const timer = setTimeout(()=>{
    //             window.onclick = onclickRef.current;
    //             onclickRef.current = null;
    //             clearTimeout(timer)
    //         }, 10)
    //     }
    // }

    const handleChange = i=>{
        if(onChange){
            onChange(values[i]);
            setCustomSelected(false)
            renderlessModal.close()
        }
    }

    const handleCustomChange = e=>{
        setCustom(e.target.value);
        setCustomSelected(true)
    }

    const getButtonName = ()=>{
        if(!ObjectUtils.isEmpty(value)){
            return value;
        }
        return initValue ?? values[0]
    }

    if(ObjectUtils.isEmpty(values)){
        return null;
    }

    return (
        <>
            <button type="button" className={cmc(Dashboard.select_btn)}
                    onClick={renderlessModal.clickToOpen}>{getButtonName()}</button>
            <ul ref={renderlessModal.ref} className={`select_layer ${renderlessModal.active && cmc(Dashboard.active)}`}>
                <input type="text" className="select_inp" value={custom}
                       onChange={handleCustomChange}
                       placeholder="예시 : 김모모 매니저"/>
                {
                    values && values.map((v, i) => {
                        return <li key={i} className='select_item'>
                            <button type="button" onClick={() => {
                                handleChange(i);
                            }}>{v}</button>
                        </li>
                    })
                }
            </ul>
        </>
    )
}