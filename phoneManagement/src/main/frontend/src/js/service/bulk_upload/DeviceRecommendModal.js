import {MenuModal} from "../../common/modal/MenuModal";
import useModal from "../../hook/useModal";
import {ModalType} from "../../common/modal/ModalType";

export function DeviceRecommendModal(props){
    const modal = useModal()
    const close = ()=>{
        modal.closeModal(ModalType.MENU.Device_Recommend)
    }
    return (
        <MenuModal modalRef={props.modalRef} top={props.top} left={props.left} width={100} height={60} close={close}>
            <div>

            </div>
        </MenuModal>
    )
}