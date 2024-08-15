import {useDispatch} from "react-redux";
import {closeModal, getStackSize, hasModal, openModal} from "../store/slices/modalSlice";
import {ModalType} from "../common/modal/ModalType";

function useModal(){
    const dispatch = useDispatch();

    const handleOpenModal = (modalName, props)=>{
        const type = ModalType.getType(modalName);
        dispatch(openModal({modalName, type, props}));
    }

    const handleCloseModal = (modalName)=>{
        dispatch(closeModal(modalName));
    }

    const hasModal = ()=>{
        return getStackSize();
    }

    return {
        openModal: handleOpenModal,
        closeModal: handleCloseModal,
        hasModal
    }
}

export default useModal;