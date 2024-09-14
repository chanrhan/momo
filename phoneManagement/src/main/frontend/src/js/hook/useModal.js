import {useDispatch, useSelector} from "react-redux";
import {closeModal, getStackSize, openModal, lock, unlock, closeAndLock} from "../store/slices/modalSlice";
import {ModalType} from "../common/modal/ModalType";
import {addTopModal, clearTopModal} from "../store/slices/TopModalSlice";

function useModal(){
    const dispatch = useDispatch();

    const handleOpenModal = (modalName, props)=>{
        const type = ModalType.getType(modalName);
        dispatch(openModal({modalName, type, props}));
    }

    const handleCloseModal = (modalName)=>{
        dispatch(closeModal(modalName));
    }

    const handleOpenRenderlessModal = (modalName, onopen, onclose, props)=>{
        dispatch(openModal({modalName, type: 'RENDERLESS', onopen, onclose, props}));
    }

    const hasModal = ()=>{
        return getStackSize();
    }

    const lockModal = (modalName)=>{
        dispatch(lock(modalName))
    }
    const unlockModal = ()=>{
        dispatch(unlock())
    }
    const closeAndLockModal = (modalName)=>{
        dispatch(closeAndLock(modalName))
    }

    const addTopElement = (topElement)=>{
        dispatch(addTopModal(topElement))
    }

    const clearTopElement = ()=>{
        dispatch(clearTopModal())
    }

    return {
        openModal: handleOpenModal,
        closeModal: handleCloseModal,
        openRenderlessModal: handleOpenRenderlessModal,
        hasModal,
        lockModal,
        unlockModal,
        closeAndLockModal,
        addTopElement,
        clearTopElement
    }
}

export default useModal;