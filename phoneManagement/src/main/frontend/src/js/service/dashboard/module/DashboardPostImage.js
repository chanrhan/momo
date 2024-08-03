import {cm} from "../../../utils/cm";
import Dashboard from "../../../../css/dashboard.module.css";
import {useState} from "react";
import {useObjectArrayInputField} from "../../../hook/useObjectArrayInputField";

export function DashboardPostImage({}){
    const inputField = useObjectArrayInputField({
        text: 'dd',
        file: null
    })

    return (
        <div className={cm(Dashboard.panel_group)}>
            <div className={cm(Dashboard.panel, Dashboard.n5)}>
                <button type="button" className="btn btn_blue btn_small btn_add_icon">추가</button>
                <ul className={cm(Dashboard.panel_list)}>
                    {
                        inputField.input && inputField.input.map((v,i)=> {
                            return <li key={i} className={cm(Dashboard.panel_item)}>
                                <div className={cm(Dashboard.panel_item_head)}>
                                    <input type="text" className={cm(Dashboard.panel_item_text)}
                                           value={v.text}
                                           onChange={e=>{
                                               inputField.put(i,'text', e.target.value)
                                           }}
                                           placeholder='텍스트를 입력하세요'/>
                                    <button type="button" className={cm(Dashboard.panel_item_del)}>삭제</button>
                                </div>
                                <div className={cm(Dashboard.panel_item_body)}>
                                    <input type="file" id={`pimg_${i}`} style={{
                                        visibility: "hidden"
                                    }}/>
                                    <label htmlFor={`pimg_${i}`} className={cm(Dashboard.panel_item_add)}>추가</label>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}
