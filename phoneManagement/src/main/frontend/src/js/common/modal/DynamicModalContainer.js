import {useSelector} from "react-redux";
import {createPortal} from "react-dom";
import {useEffect, useMemo, useRef} from "react";
import {ObjectUtils} from "../../utils/objectUtil";
import useModal from "../../hook/useModal";
import ChangeNicknameModal from "../../account/modal/ChangeNicknameModal";
import ChangeShopModal from "../../shop/modal/ChangeShopModal";
import AddShopModal from "../../shop/modal/AddShopModal";
import AlertModal from "./snackbar/AlertModal";
import UpdatePasswordModal from "../../account/modal/UpdatePasswordModal";
import MenuModalTest from "../../test/MenuModalTest";
import AddSaleModal from "../../service/sale/modal/AddSaleModal";
import SaleDetailModal from "../../service/sale/modal/SaleDetailModal";
import SelectSecondModal from "../../service/sale/modal/SelectSecondModal";
import SelectCardModal from "../../service/sale/modal/SelectCardModal";
import SelectCombMainModal from "../../service/sale/modal/SelectCombMainModal";
import SelectExsvcModel from "../../service/sale/modal/SelectExsvcModel";
import SelectPlanModal from "../../service/sale/modal/SelectPlanModal";
import SelectGreenPhoneModal from "../../service/sale/modal/SelectGreenPhoneModal";
import TableHeaderSelectModal from "../../test/TableHeaderSelectModal";
import TableValidationModal from "../../test/TableValidationModal";
import {WarningModal} from "./snackbar/WarningModal";
import {InfoModal} from "./snackbar/InfoModal";
import {MonthSelectModal} from "./menu/MonthSelectModal";
import {DateSelectModal} from "./menu/DateSelectModal";
import {SelectModal} from "./menu/SelectModal";
import {useClickaway} from "../useClickaway";

const MODAL_COMPONENTS = {
    ChangeNickname: ChangeNicknameModal,
    ChangeShop: ChangeShopModal,
    AddShop: AddShopModal,
    Alert: AlertModal,
    UpdatePassword: UpdatePasswordModal,
    MenuModalTest: MenuModalTest,
    AddSale: AddSaleModal,
    SaleDetail: SaleDetailModal,
    SelectSecond: SelectSecondModal,
    SelectCard: SelectCardModal,
    SelectComb: SelectCombMainModal,
    SelectExsvc: SelectExsvcModel,
    SelectPlan: SelectPlanModal,
    SelectGreen: SelectGreenPhoneModal,
    SelectTableHeader: TableHeaderSelectModal,
    TableValidation: TableValidationModal,
    Select: SelectModal,
    SelectMonth: MonthSelectModal,
    SelectDate: DateSelectModal,
    // error
    Warning: WarningModal,
    Info: InfoModal
}

function DynamicModalContainer(){
    const clickaway = useClickaway();
    const modal = useModal();
    const modalList = useSelector(state=>state.modalReducer);
    const stack = useSelector(state=>state.clickawayReducer)

    const topComponentRef = useRef(null);

    useMemo(() => {
        let timer = null;
        if(window.onclick == null){
            timer = setTimeout(()=>{
                // onclick 함수를 추가하자마자, 이게 호출된다
                // 버튼을 눌러서 해당 useEffect 를 실행하니 아래 onclick 도 거의 동시에 실행되서 생기는 문제인 듯 싶다
                // Timeout 으로 해결
                window.onclick = e=>{
                    console.table(stack)
                    const {componentRef, onClose} = clickaway.pop();
                    console.log(`ref: ${componentRef}`)
                    console.log(`onClose: ${onClose}`)

                    if(componentRef && !componentRef.contains(e.target)){
                        if(onClose){
                            onClose();
                        }
                    }
                }
            }, 10);
        }
        return ()=>{
            clearTimeout(timer);
            window.onclick = null;
        }
    }, []);

    useEffect(()=>{
        if(ObjectUtils.isEmpty(modalList)){
            return;
        }

        const {type, modalName} = modalList[modalList.length-1];
        if(type === 'MENU' || type === 'LAYER'){
            clickaway.push(topComponentRef.current, ()=>{
                modal.closeModal(modalName);
            });
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

export default DynamicModalContainer;