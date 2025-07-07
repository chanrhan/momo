
import Popup from "../../../css/popup.module.css"
import useModal from "../../hook/useModal";
import {ModalType} from "../modal/ModalType";
import {MouseEventUtils} from "../../utils/MouseEventUtils";
import {DYNAMIC_TYPE} from "../modal/DynamicSelectModal";
import {useRenderlessModal} from "../../hook/useRenderlessModal";
import {ObjectUtils} from "../../utils/objectUtil";
import {cm} from "../../utils/cm";

export function DynamicSelectButton({provider, type, onChange, value, onClear}){
    // const renderlessModal = useRenderlessModal(`RDL_DYNAMIC_SELECT_${onChange}_${value}`)
    const modal = useModal();

    return (
        <>
            <button type="button"
                    className={cm(Popup.dynamic_btn, `${ObjectUtils.isEmpty(value) && Popup.empty_value}`)}
                    onClick={(e) => {
                        const {top, left} = MouseEventUtils.getAbsolutePos(e);
                        modal.openModal(ModalType.MENU.Dynamic_Select, {
                            top: top + e.currentTarget.offsetHeight,
                            left: left,
                            width: e.currentTarget.offsetWidth,
                            height: e.currentTarget.offsetHeight,
                            type: type,
                            provider: provider,
                            onSubmit: onChange
                        })
                    }}>{ObjectUtils.isEmpty(value) ? '옵션을 선택하세요' : value}
            </button>
            {
                !ObjectUtils.isEmpty(value) &&
                <button type="button" className={Popup.btn_clear} onClick={onClear}>

                </button>
            }
        </>

    )
}