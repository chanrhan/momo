import {SnackbarModal} from "../SnackbarModal";
import useModal from "../../hook/useModal";
import {ModalType} from "../ModalType";
import {useEffect} from "react";

function AlertModal(props){
    const modal = useModal();

    const close = ()=>{
        modal.closeModal(ModalType.SNACKBAR.Alert)
    }

    return (
        <SnackbarModal x='50%' y='60%' close={close} timeout='3000'>
            <div className='mt-3 d-flex justify-content-center align-items-center'>
                <h5>{props.msg}</h5>
            </div>
        </SnackbarModal>
    )
}

export default AlertModal;