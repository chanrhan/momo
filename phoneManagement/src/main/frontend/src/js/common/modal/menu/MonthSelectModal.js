import {cm} from "../../../utils/cm";
import Calender from "../../../../css/calendar.module.css";
import {MenuModal} from "../MenuModal";
import useModal from "../../../hook/useModal";
import {ModalType} from "../ModalType";
import {useEffect, useRef, useState} from "react";
import {DateUtils} from "../../../utils/DateUtils";

export function MonthSelectModal({onSelect, inputField, name}){
    const [active, setActive] = useState(false)
    const componentRef = useRef(null)
    const onClickRef = useRef()

    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());

    useEffect(() => {
        if(active){
            attachOnClick();
        }else{
            detachOnClick()
        }
    }, [active]);

    const attachOnClick = ()=>{
        if(window.onclick){
            onClickRef.current = window.onclick;
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
                window.onclick = onClickRef.current;
                onClickRef.current = null;
                clearTimeout(timer)
            }, 10)
        }
    }

    const select = (month)=>{
        if(onSelect) onSelect(year,month);
        setActive(false)
    }

    const nextYear = ()=>{
        setYear(year+1)
    }

    const prevYear = ()=>{
        setYear(year-1)
    }

    return (
        <>
            <input type="text" className="inp date" value={inputField.getInput(name)} placeholder="날짜 선택" readOnly onClick={()=>{
                setActive(!active)
            }}/>
            <div className={cm(Calender.date_popup, `${active && Calender.active}`)} ref={componentRef}>
                <div className={Calender.popup_control}>
                    <span className={Calender.popup_year}>{year}년</span>
                    <button type="button" className={cm(Calender.control_btn, Calender.btn_prev)} onClick={prevYear}>이전</button>
                    <button type="button" className={cm(Calender.control_btn, Calender.btn_next)} onClick={nextYear} disabled={!DateUtils.hasNextYear(year)}>다음</button>
                </div>
                <ul className={Calender.popup_list}>
                    {
                        new Array(12).fill(0).map((_, i) => {
                            return <li key={i} className={Calender.popup_item}>
                                <button type="button" className={Calender.popup_btn} onClick={()=>{
                                    select(i+1)
                                }}>{i + 1}월</button>
                            </li>
                        })
                    }
                </ul>
            </div>
        </>
    )
}