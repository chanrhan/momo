import Popup from "../../../../css/popup.module.css";
import {cmc} from "../../../utils/cm";
import {useEffect, useRef} from "react";

export function SaleDetailPromiseBox({promiseInputField}){
    const scrollRef = useRef(null)
    const focusRef = useRef(null)

    useEffect(() => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [promiseInputField.input]);

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
                                   onChange={e => {
                                       promiseInputField.put(i, 'content', e.target.value)
                                   }}
                                   ref={e=>{
                                       if(promiseInputField.length()-1 === i) {
                                           focusRef.current = e;
                                       }
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
            </ul>
            <button type="button"
                    className={`${cmc(Popup.btn, Popup.btn_add_icon)}`}
                    onClick={() => {
                        if (!promiseInputField.isEmpty(promiseInputField.length() - 1, 'content')) {
                            promiseInputField.addItem()
                        }
                        setTimeout(()=>{
                            focusRef.current.focus();
                        }, 10);
                    }}>추가하기
            </button>
        </div>
    )
}