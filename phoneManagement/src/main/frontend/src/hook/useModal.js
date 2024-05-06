import {useDispatch} from "react-redux";
import {closeModal, openModal} from "../store/slices/modalSlice";
import {ModalType} from "../components/modal/ModalType";

function useModal(){
    const dispatch = useDispatch();

    const handleOpenModal = (modalName, props)=>{
        const type = ModalType.getType(modalName);
        dispatch(openModal({modalName, type, props}));
    }

    const handleCloseModal = (modalName)=>{
        dispatch(closeModal(modalName));
    }

    return {
        openModal: handleOpenModal,
        closeModal: handleCloseModal
    }
}

export default useModal;