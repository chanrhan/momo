import useModal from "../../../hook/useModal";
import {ModalType} from "../../../common/modal/ModalType";
import {LayerModal} from "../../../common/modal/LayerModal";
import Popup from "../../../../css/popup.module.css"
import User from "../../../../css/user.module.css"
import {cm, cmc} from "../../../utils/cm";
import {useEffect, useState} from "react";
import useApi from "../../../hook/useApi";

function SaleSecondModal(props){
    const modal = useModal();
    const {gmdApi} = useApi();
    const [keyword, setKeyword] = useState('')
    const [selected, setSelected] = useState(0)
    const [items, setItems] = useState([])

    useEffect(() => {
        getSecondDevice()
    }, [keyword]);

    const getSecondDevice = async ()=>{
        await gmdApi.getSecondDevice(keyword).then(({status,data})=>{
            if(status === 200 && data){
                setItems(data)
            }
        })
    }

    const handleKeyword = e=>{
        setKeyword(e.target.value)
    }


    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Sale_Second)
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
                <div className={Popup.popup_title}>세컨 디바이스 선택</div>

                <form className={Popup.service}>
                    <div className={Popup.popup_cont}>
                        <div className={Popup.service_search}>
                            <input type="text" name='keyword' value={keyword} onChange={handleKeyword} className={`inp ${Popup.inp_search}`} placeholder="검색어를 입력해주세요."/>
                        </div>

                        <div className={Popup.service_scroll}>
                            <ul className="service_list">
                                {
                                    items && items.map((v,i)=>{
                                        return <DeviceItem key={i} device_nm={v.device_nm} device_cd={v.device_cd}/>
                                    })
                                }
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

function DeviceItem({key, device_nm, device_cd}){
    return (
        <li key={key} className={cm(Popup.service_item)}>
            <button className={Popup.button} type="button">{device_nm}<span className={Popup.span}>{device_cd}</span>
            </button>
        </li>
    )
}

export default SaleSecondModal;