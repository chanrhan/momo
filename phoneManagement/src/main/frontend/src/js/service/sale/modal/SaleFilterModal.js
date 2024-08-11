import User from "../../../../css/user.module.css"
import Popup from "../../../../css/popup.module.css"
import {cm, cmc} from "../../../utils/cm";
import {SaleFilterItem} from "../module/SaleFilterItem";
import useModal from "../../../hook/useModal";
import {ModalType} from "../../../common/modal/ModalType";
import {LayerModal} from "../../../common/modal/LayerModal";
import {useObjectArrayInputField} from "../../../hook/useObjectArrayInputField";

export function SaleFilterModal(props){
    // const inputField = useFilterInputField();
    const inputField = useObjectArrayInputField({
        and: false,
        option: 0,
        type: 0,
        target: 0
    }, props.data)
    const modal = useModal()

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Sale_Filter)
    }

    const submit = ()=>{
        if(props.onSubmit){
            props.onSubmit(inputField.input)
        }
        close();
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
                                inputField.input && inputField.input.map((_, i) => {
                                    return <SaleFilterItem inputField={inputField} index={i}/>
                                })
                            }
                        </ul>
                    </div>

                    <div className={Popup.popup_btn_box}>
                        <button type="button" className={`btn_blue ${cmc(Popup.btn)}`} onClick={submit}>확인</button>
                    </div>
                </form>

                <button type="button" className={Popup.popup_close} onClick={close}>닫기</button>
            </div>
        </LayerModal>
    )

}