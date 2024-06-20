import {useSelector} from "react-redux";
import {createPortal} from "react-dom";
import {useEffect, useRef} from "react";
// import ChangeNicknameModal from "../../../../backup/components/user/ChangeNicknameModal";
// import ChangeShopModal from "../../../../backup/components/shop/ChangeShopModal";
// import AddShopModal from "../../../../backup/components/shop/AddShopModal";
// import AlertModal from "../snackbar/AlertModal";
// import UpdatePasswordModal from "../../../../backup/components/user/UpdatePasswordModal";
// import {ModalType} from "./ModalType";
// import {MenuModal} from "./MenuModal";
// import SaleDetailModal from "../../../../backup/components/sale/SaleDetailModal";
// import AddSaleModal from "../../../../backup/components/sale/AddSaleModal";
// import SelectSecondModal from "../../../../backup/components/sale/SelectSecondModal";
// import SelectCardModal from "../../../../backup/components/sale/SelectCardModal";
// import SelectCombMainModal from "../../../../backup/components/sale/SelectCombMainModal";
// import SelectExsvcModel from "../../../../backup/components/sale/SelectExsvcModel";
// import SelectPlanModal from "../../../../backup/components/sale/SelectPlanModal";
// import SelectGreenPhoneModal from "../../../../backup/components/sale/SelectGreenPhoneModal";
import {ObjectUtils} from "../../utils/objectUtil";
import useModal from "../../hook/useModal";

const MODAL_COMPONENTS = {
    // ChangeNickname: ChangeNicknameModal,
    // ChangeShop: ChangeShopModal,
    // AddShop: AddShopModal,
    // Alert: AlertModal,
    // UpdatePassword: UpdatePasswordModal,
    // MenuModalTest: MenuModalTest,
    // AddSale: AddSaleModal,
    // SaleDetail: SaleDetailModal,
    // SelectSecond: SelectSecondModal,
    // SelectCard: SelectCardModal,
    // SelectComb: SelectCombMainModal,
    // SelectExsvc: SelectExsvcModel,
    // SelectPlan: SelectPlanModal,
    // SelectGreen: SelectGreenPhoneModal,
    // SelectTableHeader: TableHeaderSelectModal,
    // TableValidation: TableValidationModal
}

function ModalContainer(){
    const modal = useModal();
    const modalList = useSelector(state=>state.modalReducer);
    const topComponentRef = useRef(null);

    useEffect(()=>{
        if(ObjectUtils.isEmpty(modalList)){
            return;
        }
        let timer = null;
        const {type, modalName} = modalList[modalList.length-1];
        if(type === 'MENU' || type === 'LAYER'){
            if(window.onclick == null){
                timer = setTimeout(()=>{
                    // onclick 함수를 추가하자마자, 이게 호출된다
                    // 버튼을 눌러서 해당 useEffect 를 실행하니 아래 onclick 도 거의 동시에 실행되서 생기는 문제인 듯 싶다
                    // Timeout 으로 해결
                    window.onclick = e=>{
                        if(topComponentRef.current && !topComponentRef.current.contains(e.target)){
                            modal.closeModal(modalName);
                        }
                    }
                }, 10);
            }
        }
        return ()=>{
            clearTimeout(timer);
            window.onclick = null;
        }
    },[modalList])


    const renderModal = modalList.map(({modalName, type, props}, index)=>{
        if(!modalName){
            return null;
        }

        const ModalComponent = MODAL_COMPONENTS[modalName];

        if(index === modalList.length-1){
            if(type === 'MENU' || type === 'LAYER'){
                return <ModalComponent modalRef={topComponentRef} key={modalName} {...props}/>
            }
        }

        return <ModalComponent key={modalName} {...props}/>
    });


    return createPortal(
        <>
            {renderModal}
        </>, document.getElementById('root')
    )
}

export default ModalContainer;