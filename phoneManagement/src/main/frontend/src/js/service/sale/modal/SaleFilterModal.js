import User from "../../../../css/user.module.css"
import Popup from "../../../../css/popup.module.css"
import {cm, cmc} from "../../../utils/cm";
import {SaleFilterItem} from "../module/SaleFilterItem";
import useValidateInputField from "../../../hook/useValidateInputField";
import {useState} from "react";
import useModal from "../../../hook/useModal";
import {ModalType} from "../../../common/modal/ModalType";
import {LayerModal} from "../../../common/modal/LayerModal";

export function SaleFilterModal(props){
    const inputField = useFilterInputField();
    const modal = useModal()

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Sale_Filter)
    }


    return (
        <LayerModal>
            <div className={cm(Popup.popup)}
                 style={
                    {
                        top: props.top,
                        left: props.left,
                        maxWidth: '609px'
                    }
                }>
                {/*활성화시 active 추가 -->*/}
                <div className={Popup.popup_title}>필터</div>

                <form className={Popup.filter}>
                    <div className={Popup.popup_cont}>
                        <div className="ta_r">
                            <button type="button" className={`btn_blue ${cmc(Popup.btn_small, Popup.btn)}`}
                                    onClick={inputField.addItem}>항목추가
                            </button>
                        </div>

                        <ul className={Popup.filter_list}>
                            {
                                inputField && inputField.and.map((_, i) => {
                                    return <SaleFilterItem filterInputField={inputField} index={i}/>
                                })
                            }
                        </ul>
                    </div>

                    <div className={Popup.popup_btn_box}>
                        <button type="button" className={`btn_blue ${cmc(Popup.btn)}`}>확인</button>
                    </div>
                </form>

                <button type="button" className={Popup.popup_close} onClick={close}>닫기</button>
            </div>
        </LayerModal>
    )
}

function useFilterInputField() {
    const [and, setAnd] = useState([0])
    const [type, setType] = useState([0])
    const [option, setOption] = useState([0])
    const [data, setData] = useState([0])

    const putAnd = (index, value) => {
        const copy = [...and];
        copy[index] = value;
        setAnd(copy)
    }

    const putType = (index, value) => {
        const copy = [...type];
        copy[index] = value;
        setType(copy)
    }

    const putOption = (index, value) => {
        const copy = [...option];
        copy[index] = value;
        setOption(copy)
    }

    const putData = (index, value) => {
        const copy = [...data];
        copy[index] = value;
        setData(copy)
    }

    const addItem = () => {
        const copy1 = [...and];
        const copy2 = [...type];
        const copy3 = [...option];
        const copy4 = [...data];
        copy1.push(0)
        copy2.push(0)
        copy3.push(0)
        copy3.push(0)
        setAnd(copy1)
        setType(copy2)
        setOption(copy3)
        setData(copy4)
    }

    const removeItem = (index) => {
        const copy1 = [...and];
        const copy2 = [...type];
        const copy3 = [...option];
        const copy4 = [...data];
        copy1.splice(index,1)
        copy2.splice(index,1)
        copy3.splice(index,1)
        copy4.splice(index,1)
        setAnd(copy1)
        setType(copy2)
        setOption(copy3)
        setData(copy4)
    }
    return {
        and,
        type,
        option,
        data,
        putAnd,
        putType,
        putOption,
        putData,
        addItem,
        removeItem
    }
}