import {useSelector} from "react-redux";
import {createPortal} from "react-dom";
import ChangeNicknameModal from "../user/ChangeNicknameModal";
import ChangeShopModal from "../shop/ChangeShopModal";
import AddShopModal from "../shop/AddShopModal";

const MODAL_COMPONENTS = {
    ChangeNickname: ChangeNicknameModal,
    ChangeShop: ChangeShopModal,
    AddShop: AddShopModal
}

function ModalContainer(){
    const modalList = useSelector(state=>state.modalReducer);

    const renderModal = modalList.map(({type,props})=>{
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