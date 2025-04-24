import Board from "../../../css/board.module.css";
import {useEffect, useRef, useState} from "react";

export function EditableAddButton({inpClassName, btnClassName, onUpdate, value}){
    const [editable, setEditable] = useState(false)
    const inpRef = useRef(null)

    useEffect(() => {
        if(editable && inpRef){
            inpRef.current.focus();
        }
    }, [editable]);

    const submit = v=>{
        if(onUpdate){
            onUpdate(v)
        }
        setEditable(false)
    }

    return (
        <>
            {
                editable ? (
                    <input type="text" className={inpClassName}
                           onBlurCapture={e=>{
                               submit(e.target.value)
                               e.stopPropagation();
                           }}
                           placeholder="옵션명을 입력하세요"
                           maxLength={20}
                           onKeyDown={e=>{
                               e.stopPropagation();
                            if(e.key === 'Enter') {
                                submit(e.target.value);
                            }
                    }} ref={inpRef}/>
                ) : <button type='button' onClick={() => {
                    setEditable(true)
                }}  className={btnClassName}>{value}
                </button>
            }
        </>
    )
}