import useModal from "../modal/useModal";
import {ModalType} from "../modal/ModalType";

function ModalTest(){
    const modal = useModal();

    const openNotifModal = ()=>{
        modal.openModal(ModalType.SNACKBAR.Alert)
    }

    return (
        <div className='mt-4'>
            <button className='btn btn-outline-secondary' onClick={openNotifModal}>SNACKBAR</button>
        </div>
    )
}

export default ModalTest;