import useModal from "../utils/useModal";
import {ModalType} from "../modal/ModalType";

function ModalTest(){
    const modal = useModal();

    const openNotifModal = ()=>{
        modal.openModal(ModalType.SNACKBAR.Alert)
    }

    const openMenuModal = (e)=>{
        modal.openModal(ModalType.MENU.Test, {
            e
        });
    }

    return (
        <div className='mt-4'>
            <button className='btn btn-outline-secondary' onClick={openNotifModal}>SNACKBAR</button>
            <button className='btn btn-outline-secondary ms-3' onClick={openMenuModal}>Menu Modal Test</button>
        </div>
    )
}

export default ModalTest;