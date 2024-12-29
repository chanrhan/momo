import Popup from "../../../../css/popup.module.css";
import {cmc} from "../../../utils/cm";
import {useEffect, useRef, useState} from "react";
import {ObjectUtils} from "../../../utils/objectUtil";
import {EditableAddButton} from "../../../common/module/EditableAddButton";

// promiseInputField : { checked: boolean, content: string }
export function SaleDetailPromiseBox({promiseInputField}){
    const scrollRef = useRef(null)
    const focusRef = useRef([])
    const [editContent, setEditContent] = useState('')

    const [focusIndex, setFocusIndex] = useState(-1);

    useEffect(() => {
        promiseInputField.removeItem(0)
    }, []);

    useEffect(() => {
        if(focusIndex !== -1){
            focusRef.current[focusIndex].focus();
        }
    }, [focusIndex]);

    const addItem = (v)=>{
        setFocusIndex(-1)
        if(ObjectUtils.isEmpty(v)){
            return;
        }
        promiseInputField.addItemOf({
            checked: false,
            content: v
        });
        setEditContent('')

        // 추가하면 목록이 밀릴 것이므로 다시 스크롤 조정
        setTimeout(()=>{
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }, 10)
    }

    return (
        <div className={Popup.data_area} ref={scrollRef} style={{
            overflowY: 'scroll'
        }}>
            <ul className={Popup.popup_check_list}>
                {
                    promiseInputField.length() > 0 && promiseInputField.input.map((v, i) => {
                        return <li key={i} className={Popup.li}>
                            <input type="checkbox" name={`apm${i}`}
                                   className={Popup.check_inp}
                                   checked={promiseInputField.get(i, 'checked')}
                                   readOnly/>
                            <label htmlFor={`apm${i}`}
                                   className={Popup.check_label}
                                   onClick={() => {
                                       promiseInputField.put(i, 'checked', !promiseInputField.get(i, 'checked'))
                                   }}>
                            </label>
                            <input type="text" className={Popup.check_text}
                                   value={promiseInputField.get(i, 'content')}
                                   onClick={()=>{
                                       setFocusIndex(i);
                                   }}
                                   onChange={e => {
                                       promiseInputField.put(i, 'content', e.target.value)
                                   }}
                                   // onKeyDown={e=>{
                                   //     if(e.key === 'Enter') {
                                   //         e.stopPropagation()
                                   //          // focusRef.current[i].blur();
                                   //     }
                                   // }}
                                   ref={e=>{
                                       focusRef.current[i] = e;
                                   }}
                                   placeholder='내용을 입력해주세요'/>
                            <button type="button" className={Popup.check_del}
                                    onClick={() => {
                                        promiseInputField.removeItem(i)
                                    }}>삭제
                            </button>
                        </li>
                    })
                }
                <div className={Popup.promise_add_box} style={{
                    marginTop: `${promiseInputField.length() === 0 ? 0:10}px`
                }}>
                    <EditableAddButton inpClassName={Popup.add_inp}
                                       btnClassName={Popup.btn_add_icon}
                                       value='약속 추가하기' onUpdate={addItem}/>
                </div>
            </ul>


        </div>
    )
}