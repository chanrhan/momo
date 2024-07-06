import {useEffect, useState} from "react";
import {cmc} from "../../utils/cm";
import User from "../../../css/user.module.css";
import {ObjectUtils} from "../../utils/objectUtil";

export function SelectOptionLayer({initValue, inputField, name, values, onChange, className, top, left, width}){
    const [selected, setSelected]= useState(initValue ?? 0)
    const [active, setActive] = useState(false)

    useEffect(() => {
        if(typeof inputField !== 'object' && values && name){
            inputField.put(name, values[selected]);
            onChange(values[selected]);
        }
    }, [selected]);

    const toggleActive = ()=>{
        setActive(!active)
    }

    if(typeof inputField !== 'object' || ObjectUtils.isEmpty(values)){
        return null;
    }

    return (
        <>
            <button type="button" className={`${cmc(User.select_btn)} ${className}`} onClick={toggleActive}>{values[selected]}</button>
            <ul className={`select_layer ${active && 'active'}`}
                style={{
                    position: 'absolute',
                    width: width,
                    top: top,
                    left: left,
                }}>
                {
                    values && values.map((v,i)=> {
                        return <li key={i} className="select_item">
                            <button type="button" onClick={()=>{
                                setSelected(i);
                                setActive(false)
                            }}>{v}</button>
                        </li>
                    })
                }
            </ul>
        </>
    )
}