import {MenuModal} from "./MenuModal";
import {cm} from "../../utils/cm";
import Popup from "../../../css/popup.module.css";
import {useState} from "react";
import {MoreItem} from "../module/DynamicSelectLayer";

export function DynamicSelectModal(props){
    const [keyword, setKeyword] = useState('')

    const [items, setItems] = useState(new Array(6).fill({
        name: '테스트'
    }))

    console.log(`top: ${props.top}, left: ${props.left}`)

    const selectItem = (index, id)=>{

    }

    return (
        <MenuModal modalRef={props.modalRef} top={props.top} left={props.left}>
            <div className={cm(Popup.select_box2, Popup.active)}
                 // style={{
                 //     width: `${boxWidth}px`,
                 //     // overflowY: 'hidden'
                 // }}
            >
                <input type="text" className={cm(Popup.select_inp)}
                       value={keyword}
                       onChange={e => {
                           setKeyword(e.target.value)
                       }}
                       placeholder="옵션 검색"/>
                <div className={cm(Popup.select_layer, Popup.active)}>
                    <div className={Popup.layer_title}>옵션 추가하기</div>
                    <ul className="layer_list">
                        {
                            items && items.map((v, i) => {
                                return <li key={i} className={cm(Popup.layer_item)}>
                                    <span className={Popup.layer_type}></span>
                                    <button type="button" className={Popup.layer_btn} onClick={() => {
                                        selectItem(i, v.id);
                                    }}>{v.name}</button>
                                    <MoreItem/>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </MenuModal>
    )
}