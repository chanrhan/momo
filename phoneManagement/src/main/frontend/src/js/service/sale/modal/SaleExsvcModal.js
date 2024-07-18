import {LayerModal} from "../../../common/modal/LayerModal";
import useModal from "../../../hook/useModal";
import {ModalType} from "../../../common/modal/ModalType";
import Popup from "../../../../css/popup.module.css"
import {cm, cmc} from "../../../utils/cm";
import {useState} from "react";

function SaleExsvcModal(props){
    const modal = useModal();
    const [keyword, setKeyword] = useState('')
    const [selected, setSelected] = useState(0)


    const handleKeyword = e=>{
        setKeyword(e.target.value)
    }

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Sale_Exsvc)
    }

    const submit = ()=>{
        if(props.onSubmit){
            props.onSubmit(selected)
        }
        close();
    }

    return (
        <LayerModal>
            <div className={cm(Popup.popup,Popup.active)} style={{
                top: '130px'
            }}>
                {/*활성화시 active 추가 -->*/}
                <div className={Popup.popup_title}>부가서비스 선택</div>

                <form className={Popup.service}>
                    <div className={Popup.popup_cont}>
                        <div className={Popup.service_search}>
                            <input type="text" name='keyword' className={`inp ${Popup.inp_search}`} value={keyword} onChange={handleKeyword} placeholder="검색어를 입력해주세요."/>
                        </div>

                        <div className={Popup.service_scroll}>
                            <ul className="service_list">
                                <ExsvcItem value='필수팩 S'/>
                                <ExsvcItem value='필수팩 S'/>
                                <ExsvcItem value='필수팩 S'/>
                                <ExsvcItem value='필수팩 S'/>
                            </ul>
                        </div>
                    </div>

                    <div className={Popup.popup_btn_box}>
                        <button type="button" className={`btn_blue ${cmc(Popup.btn)}`} onClick={submit}>저장</button>
                    </div>
                </form>

                <button type="button" className={Popup.popup_close} onClick={close}>닫기</button>
            </div>
        </LayerModal>
    )
}

function ExsvcItem({key, value}){
    return (
        <li key={key} className={cm(Popup.service_item)}>
            <button type="button" className={Popup.button}>{value}</button>
        </li>
    )
}

export default SaleExsvcModal;