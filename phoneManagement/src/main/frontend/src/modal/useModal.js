import {useDispatch} from "react-redux";
import {closeModal, openModal} from "../store/slices/modalSlice";

function useModal(){
    const dispatch = useDispatch();

    const handleOpenModal = (type,props)=>{
        dispatch(openModal({type,props}));
    }

    const handleCloseModal = (type)=>{
        dispatch(closeModal(type));
    }

    return {
        openModal: handleOpenModal,
        closeModal: handleCloseModal
    }
}

export default useModal;