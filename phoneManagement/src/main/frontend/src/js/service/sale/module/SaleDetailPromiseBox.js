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

    const nextIndex = promiseInputField ? promiseInputField.length() : -1;

    useEffect(() => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [promiseInputField.input]);

    useEffect(() => {
        if(focusIndex !== -1){
            // if(focusIndex < nextIndex){
            //     setEditContent(promiseInputField.get(focusIndex, 'content') ?? '');
            // }
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
                            {/*<input type="text" className={Popup.inp} value={apmInputField.contents[i]} onChange={e=>{*/}
                            {/*    apmInputField.putContent(i, e.target.value)*/}
                            {/*}}/>*/}
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
                    {/*{*/}
                    {/*    focusIndex === nextIndex ? (*/}
                    {/*            <input type="text" className={Popup.add_inp}*/}
                    {/*                   value={editContent}*/}
                    {/*                   onChange={e => {*/}
                    {/*                       setEditContent(e.target.value)*/}
                    {/*                   }}*/}
                    {/*                   onBlurCapture={e=>{*/}
                    {/*                        addItem();*/}
                    {/*                   }}*/}
                    {/*                   onKeyDown={e => {*/}
                    {/*                       if (e.key === 'Enter') {*/}
                    {/*                            addItem()*/}
                    {/*                       }*/}
                    {/*                   }}*/}
                    {/*                   ref={e => {*/}
                    {/*                       if(e){*/}
                    {/*                            e.focus();*/}
                    {/*                           focusRef.current[nextIndex] = e;*/}
                    {/*                       }*/}
                    {/*                   }}*/}
                    {/*                   placeholder='내용을 입력해주세요'/>*/}
                    {/*        )*/}
                    {/*        : (*/}
                    {/*            <button type="button"*/}
                    {/*                    className={`${cmc(Popup.btn, Popup.btn_add_icon)}`}*/}
                    {/*                    onClick={() => {*/}
                    {/*                        const content = promiseInputField.lastItem('content');*/}
                    {/*                        if(!ObjectUtils.isEmpty(content)){*/}
                    {/*                            setFocusIndex(nextIndex)*/}
                    {/*                        }*/}
                    {/*                    }}>추가하기*/}
                    {/*            </button>*/}
                    {/*        )*/}
                    {/*}*/}
                </div>
            </ul>


        </div>
    )
}