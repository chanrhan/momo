import {useSelector} from "react-redux";
import {createPortal} from "react-dom";
import {useEffect, useRef, useState} from "react";
import {ObjectUtils} from "../../utils/objectUtil";
import useModal from "../../hook/useModal";
import ChangeNicknameModal from "../../account/modal/ChangeNicknameModal";
import ChangeShopModal from "../../shop/modal/ChangeShopModal";
import AddShopModal from "../../shop/modal/AddShopModal";
import AlertModal from "./snackbar/AlertModal";
import MenuModalTest from "../../test/MenuModalTest";
import SaleDetailModal from "../../service/sale/modal/SaleDetailModal";
import SecondDeviceSearchModal from "../../service/sale/modal/SecondDeviceSearchModal";
import SaleCardModal from "../../service/sale/modal/SaleCardModal";
import SaleCombModal from "../../service/sale/modal/SaleCombModal";
import SaleExsvcModal from "../../service/sale/modal/SaleExsvcModal";
import TableHeaderSelectModal from "../../test/TableHeaderSelectModal";
import TableValidationModal from "../../test/TableValidationModal";
import {WarningModal} from "./snackbar/WarningModal";
import {InfoModal} from "./snackbar/InfoModal";
import {MonthSelectLayer} from "./menu/MonthSelectLayer";
import {DateSelectModal} from "./menu/DateSelectModal";
import {SelectModal} from "./menu/SelectModal";
import {SaleWtPlanModal} from "../../service/sale/modal/SaleWtPlanModal";
import {SaleFilterModal} from "../../service/sale/modal/SaleFilterModal";
import {ReserveMessageModal} from "../../service/sale/modal/ReserveMessageModal";
import {ReserveDateModal} from "../../service/sale/modal/ReserveDateModal";
import {DeviceSearchModal} from "../../service/sale/modal/DeviceSearchModal";
import {PlanSearchModal} from "../../service/sale/modal/PlanSearchModal";
import SaleUsedDeviceModal from "../../service/sale/modal/SaleUsedDeviceModal";
import {TodoAddModal} from "../../service/dashboard/module/TodoAddModal";
import {BulkUploadModal} from "../../admin/module/BulkUploadModal";
import {InviteModal} from "../../service/dashboard/module/InviteModal";
import {ChargePointModal} from "../../profile/module/ChargePointModal";
import {PaymentCardModal} from "../../profile/module/PaymentCardModal";
import {UpdatePasswordModal} from "../../profile/module/UpdatePasswordModal";
import {NameCardModal} from "../../profile/module/NameCardModal";
import {DynamicSelectModal} from "./DynamicSelectModal";
import {MoreOptionModal} from "./menu/MoreOptionModal";
import {ScrollUtils} from "../../utils/ScrollUtils";
import {UsedDeviceCmsModal} from "../../service/task/module/TaskUsedDeviceCmsModal";

const MODAL_COMPONENTS = {
    // common
    DynamicSelect: DynamicSelectModal,
    MoreOption: MoreOptionModal,
    BulkUpload: BulkUploadModal,
    Invite: InviteModal,
    Charge_Point: ChargePointModal,
    Alert: AlertModal,

    // todo
    Payment_Card: PaymentCardModal,

    // Profile
    TodoAdd: TodoAddModal,
    UpdatePassword: UpdatePasswordModal,
    NameCard: NameCardModal,

    // Shop
    ChangeNickname: ChangeNicknameModal,
    ChangeShop: ChangeShopModal,
    AddShop: AddShopModal,

    // Test
    MenuModalTest: MenuModalTest,
    // sale
    SaleDetail: SaleDetailModal,
    SaleSecond: SecondDeviceSearchModal,
    SaleCard: SaleCardModal,
    SaleComb: SaleCombModal,
    SaleExsvc: SaleExsvcModal,
    SaleWtPlan: SaleWtPlanModal,
    SaleUsedPhone: SaleUsedDeviceModal,

    // sale common
    DeviceSearch: DeviceSearchModal,
    PlanSearch: PlanSearchModal,


    SelectTableHeader: TableHeaderSelectModal,
    TableValidation: TableValidationModal,
    Select: SelectModal,
    SelectMonth: MonthSelectLayer,
    SelectDate: DateSelectModal,
    SaleFilter: SaleFilterModal,
    ReserveMessage: ReserveMessageModal,
    ReserveDate: ReserveDateModal,

    // Task
    UsedDeviceCms: UsedDeviceCmsModal,

    // error
    Warning: WarningModal,
    Info: InfoModal
}

function DynamicModalContainer(){
    const modal = useModal();
    const modalList = useSelector(state=>state.modalReducer);
    const topComponentRef = useRef(null);

    const [prevScrollY, setPrevScrollY] = useState(null)

    useEffect(()=>{
        if(ObjectUtils.isEmpty(modalList)){
            return;
        }
        let timer = null;
        const {type, modalName} = modalList[modalList.length-1];
        if(type === 'MENU' || type === 'LAYER'){
            // console.log(`scroll fixed: ${window.scrollY}`)
            // setPrevScrollY( ScrollUtils.preventScroll(document.body))
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
            // console.log(`scrollY: ${prevScrollY}`)
            // if(!ObjectUtils.isEmpty(prevScrollY)){
            //     console.log(`detach onclick`)
            //     ScrollUtils.allowScroll(document.body, prevScrollY);
            //     setPrevScrollY(null)
            // }
        }
    },[modalList])

    let topIndex = 0;
    modalList.forEach(({modalName, type, props}, index)=>{
        if(type === 'MENU' || type === 'LAYER'){
            topIndex = index
        }
    })

    const renderModal = modalList.map(({modalName, type, props}, index)=>{
        if(!modalName){
            return null;
        }

        const ModalComponent = MODAL_COMPONENTS[modalName];

        // if(index === modalList.length-1){
        //     if(type === 'MENU' || type === 'LAYER'){
        //         return <ModalComponent scrollable={true} modalRef={topComponentRef} key={modalName} {...props}/>
        //     }
        // }
        if(index === topIndex){
            return <ModalComponent scrollable={true} modalRef={topComponentRef} key={modalName} {...props}/>
        }

        return <ModalComponent scrollable={false} key={modalName} {...props}/>
    });


    return createPortal(
        <>
            {renderModal}
        </>, document.getElementById('root')
    )
}

export default DynamicModalContainer;