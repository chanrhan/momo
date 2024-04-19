import {useSelector} from "react-redux";
import {createPortal} from "react-dom";
import ChangeNicknameModal from "../user/ChangeNicknameModal";
import ChangeShopModal from "../shop/ChangeShopModal";
import AddShopModal from "../shop/AddShopModal";
import AlertModal from "./snackbar/AlertModal";
import UpdatePasswordModal from "../user/UpdatePasswordModal";

const MODAL_COMPONENTS = {
    ChangeNickname: ChangeNicknameModal,
    ChangeShop: ChangeShopModal,
    AddShop: AddShopModal,
    Alert: AlertModal,
    UpdatePassword: UpdatePasswordModal
}

function ModalContainer(){
    const modalList = useSelector(state=>state.modalReducer);

    const renderModal = modalList.map(({type,props})=>{
        // console.log(`modal list: ${type}`)
        if(!type){
            return null;
        }
        const ModalComponent = MODAL_COMPONENTS[type];
        return <ModalComponent key={type} {...props}/>
    });

    return createPortal(
        <>
            {renderModal}
        </>, document.getElementById('root')
    )
}

export default ModalContainer;