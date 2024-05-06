import useModal from "../hook/useModal";
import {useEffect} from "react";
import {ModalType} from "../components/modal/ModalType";
import {MenuModal} from "../components/modal/MenuModal";

function MenuModalTest(props){
    const modal = useModal();


    const close = ()=>{
        modal.closeModal(ModalType.MENU.Test);
    }


    return (
        <MenuModal modalRef={props.modalRef} x={props.e.clientX} y={props.e.clientY} width='20%' height='30%' close={close}>
            <div>
                <h3>Menu Modal Test</h3>
            </div>
        </MenuModal>
    )
}

export default MenuModalTest;