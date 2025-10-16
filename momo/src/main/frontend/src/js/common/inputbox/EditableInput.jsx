import {useEffect, useRef, useState} from "react";
import styles from "./EditableInput.module.css"
import {cm} from "../../utils/cm";

export function EditableInput({value, boxClass, inputFieldClass, textClass, onSubmit}){
    const [edit, setEdit] = useState(false)
    const [inputValue, setInputValue] = useState(value);
    const inpRef = useRef(null)

    const onEdit = (e)=>{
        setEdit(false)
        if(onSubmit) {
            onSubmit(inputValue)
        }
    }

    useEffect(() => {
        if(edit && inpRef.current){
            inpRef.current.focus()
        }
    }, [edit]);

    return (
        <div className={cm(styles.editable_input, boxClass)}>
            {
                edit ?
                    <input type="text" ref={inpRef} className={inputFieldClass} value={inputValue} onChange={(e)=>{
                        setInputValue(e.target.value)
                    }} onBlur={onEdit}
                           onKeyDown={e => {
                               if (e.key === 'Enter') {
                                   onEdit(e)
                               }
                           }}/>
                    : <>
                        <span className={textClass}>{value}</span>
                        <button className={styles.btn_edit} onClick={() => {
                            setEdit(true)
                        }}></button>
                    </>
            }

        </div>
    )
}