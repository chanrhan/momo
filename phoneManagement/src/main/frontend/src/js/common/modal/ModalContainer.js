import {useSelector} from "react-redux";
import {createPortal} from "react-dom";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {ObjectUtils} from "../../utils/objectUtil";
import useModal from "../../hook/useModal";
import ChangeNicknameModal from "../../account/modal/ChangeNicknameModal";
import AddShopModal from "../../shop/modal/AddShopModal";
import AlertModal from "./snackbar/AlertModal";
import MenuModalTest from "../../test/MenuModalTest";
import SaleDetailModal from "../../service/sale/detail/SaleDetailModal";
import SecondDeviceSearchModal from "../../service/sale/modal/SecondDeviceSearchModal";
import SaleCardModal from "../../service/sale/modal/SaleCardModal";
import SaleCombModal from "../../service/sale/modal/SaleCombModal";
import SaleExsvcModal from "../../service/sale/modal/SaleExsvcModal";
import TableHeaderSelectModal from "../../test/TableHeaderSelectModal";
import SaleDataValidationModal from "../../service/sale/modal/SaleDataValidationModal";
import {WarningModal} from "./snackbar/WarningModal";
import {InfoModal} from "./snackbar/InfoModal";
import {MonthSelectModal} from "./menu/MonthSelectModal";
import {DateSelectModule} from "./menu/DateSelectModule";
import {SelectModal} from "./menu/SelectModal";
import {SaleWtPlanModal} from "../../service/sale/modal/SaleWtPlanModal";
import {SaleFilterModal} from "../../service/sale/modal/SaleFilterModal";
import {ReserveMessageModal} from "../../service/sale/modal/ReserveMessageModal";
import {ReserveDateModal} from "../../service/sale/modal/ReserveDateModal";
import {DeviceSearchModal} from "../../service/sale/modal/DeviceSearchModal";
import {PlanSearchModal} from "../../service/sale/modal/PlanSearchModal";
import SaleUsedDeviceModal from "../../service/sale/modal/SaleUsedDeviceModal";
import {TodoAddModal} from "../../service/dashboard/module/TodoAddModal";
import {BulkUploadModal} from "../../admin/modal/BulkUploadModal";
import {InviteModal} from "../../service/dashboard/module/InviteModal";
import {ChargePointModal} from "../../profile/modal/ChargePointModal";
import {PaymentCardModal} from "../../profile/modal/PaymentCardModal";
import {UpdatePasswordModal} from "../../profile/modal/UpdatePasswordModal";
import {NameCardModal} from "../../profile/modal/NameCardModal";
import {DynamicSelectModal} from "./DynamicSelectModal";
import {MoreOptionModal} from "./menu/MoreOptionModal";
import {UsedDeviceCmsModal} from "../../service/task/modal/TaskUsedDeviceCmsModal";
import {ImagePreviewModal} from "./layer/ImagePreviewModal";
import {HintModal} from "./tooptip/HintModal";
import {ChangeShopModal} from "../../shop/modal/ChangeShopModal";
import {AddStudyNodeModal} from "../../study_private/modal/AddStudyNodeModal";
import {AddressApiModal} from "../../shop/modal/AddressApiModal";
import {useLocation} from "react-router-dom";
import {ConfirmModal} from "./snackbar/ConfirmModal";

const M_TYPE = {
    MENU: 'MENU',
    LAYER: 'LAYER',
    RENDERLESS: 'RENDERLESS',
    TOOLTIP: 'TOOLTIP'
}

const MODAL_COMPONENTS = {
    // common
    DynamicSelect: DynamicSelectModal,
    MoreOption: MoreOptionModal,
    BulkUpload: BulkUploadModal,
    Invite: InviteModal,
    ChargePoint: ChargePointModal,
    Alert: AlertModal,
    ImagePreview: ImagePreviewModal,

    // shop
    Address: AddressApiModal,

    // tooltip
    Hint: HintModal,

    // todo
    Payment_Card: PaymentCardModal,

    // Profile
    TodoAdd: TodoAddModal,
    UpdatePassword: UpdatePasswordModal,
    NameCard: NameCardModal,

    // Shop
    ChangeNickname: ChangeNicknameModal,
    // ChangeShop: ChangeShopModal,
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
    SaleDataValidation: SaleDataValidationModal,
    // Select: SelectModal,
    // SelectMonth: MonthSelectLayer,
    SelectDate: DateSelectModule,
    SaleFilter: SaleFilterModal,
    ReserveMessage: ReserveMessageModal,
    ReserveDate: ReserveDateModal,

    // Task
    UsedDeviceCms: UsedDeviceCmsModal,

    // error
    Warning: WarningModal,
    Info: InfoModal,

    Confirm: ConfirmModal,
    // study private
    AddStudyNode: AddStudyNodeModal
}

function ModalContainer(){
    const location = useLocation()
    const modal = useModal();
    const modalList : Object<string,Array> = useSelector(state=>state.modalReducer);
    const topComponentRef = useRef(null);

    const handleRef = (node) => {
        if (node) {
            // console.log('Callback ref:', node);
            topComponentRef.current = node;
        }
    };

    useEffect(() => {

    }, [location]);

    useEffect(()=>{
        if(ObjectUtils.isEmpty(modalList.list)){
            return;
        }

        const {type, modalName, onopen, onclose} = modalList.list[modalList.list.length-1];
        // console.log(`Before capture: ${topComponentRef.current?.className}`)
        const onClickCaptureEvent = (e: MouseEvent)=>{
            // console.log(`before capture: ${modalName}`)
            // console.log(`${topComponentRef.current} and ${e.target}`)
            // console.log('before capture')
            if(topComponentRef.current && !topComponentRef.current.contains(e.target)){
                // console.log('capture')
                modal.closeAndLockModal(modalName)
                window.removeEventListener('mousedown', onClickCaptureEvent, true)
                window.removeEventListener('keydown', onKeydownCaptureEvent, true)
            }
        }

        const onClickBubbleEvent = (e)=>{
            // console.log(`Before bubble: ${topComponentRef.current?.className}`)
            // console.log(`target: ${e.target?.className}`)
            // if(topComponentRef.current && !topComponentRef.current.contains(e.target)){
            //     console.log('bubble')
            //
            //     modal.unlockModal()
            //     window.removeEventListener('click', onClickBubbleEvent, false)
            // }
            // console.log('bubble')
            modal.unlockModal()
            window.removeEventListener('click', onClickBubbleEvent, false)
        }

        const onKeydownCaptureEvent = (e: KeyboardEvent)=>{
            if(e.keyCode === 27){
                modal.closeModal(modalName);

                window.removeEventListener('keydown', onKeydownCaptureEvent, true)
                window.removeEventListener('mousedown', onClickCaptureEvent, true)
                window.removeEventListener('click', onClickBubbleEvent, false)
            }
        }

        // 모든 흐름이 끝난 후 이벤트 리스너를 붙이도록 비동기적으로 처리
        const attachListenerTimer = setTimeout(()=>{
            if(type === M_TYPE.LAYER || type === M_TYPE.MENU || type === M_TYPE.RENDERLESS){
                window.addEventListener('click', onClickBubbleEvent, false)
                window.addEventListener('mousedown', onClickCaptureEvent, true) // true: capturing, false: bubbling
                // window.addEventListener('keydown', onKeydownCaptureEvent, true)
            }

            if(type === M_TYPE.MENU || type === M_TYPE.LAYER || type === M_TYPE.RENDERLESS){
                window.addEventListener('keydown', onKeydownCaptureEvent, true)
            }

        }, 10)

        return ()=>{
            // console.log('clean, ref:', topComponentRef.current?.className);
            clearTimeout(attachListenerTimer);
            window.removeEventListener('keydown', onKeydownCaptureEvent, true)
            window.removeEventListener('mousedown', onClickCaptureEvent, true)
            // window.removeEventListener('click', onClickBubbleEvent, false)
            // bubbling의 경우에는 미리 삭제하면 안되기 때문에 주석처리
        }
    },[modalList.list])

    let topIndex = 0;
    let topScrollIndex = 0;
    modalList.list.forEach(({modalName, type, props}, index)=>{
        if(type === M_TYPE.MENU || type === M_TYPE.LAYER || type === M_TYPE.RENDERLESS){
            topIndex = index
        }
        if(type === M_TYPE.LAYER || type === M_TYPE.MENU){
            topScrollIndex = index
        }
    })

    const lastIndex = modalList.list.length - 1;
    const renderModal = modalList.list.map(({modalName, type, onopen, onclose, props}, index)=>{
        if(!modalName){
            return null;
        }

        // if(index === modalList.length-1){
        //     if(type === 'MENU' || type === 'LAYER'){
        //         return <ModalComponent scrollable={true} modalRef={topComponentRef} key={modalName} {...props}/>
        //     }
        // }
        let windowBlocked = false;
        if(type === M_TYPE.LAYER && index === lastIndex){
            windowBlocked = true;
        }
        if(index === topIndex){
            if(type === M_TYPE.RENDERLESS){
                if(props.ref){
                    // console.log('props ref')
                    // console.table(topComponentRef.current?.className)
                    topComponentRef.current = props.ref;
                    // console.log('after')
                    // console.table(topComponentRef.current?.className)
                    // modal.addTopElement(props.ref)
                }

                return null;
            }
            const ModalComponent = MODAL_COMPONENTS[modalName];
            return <ModalComponent scrollable={true} modalRef={handleRef} windowBlocked={windowBlocked} key={modalName} {...props}/>
        }

        const ModalComponent = MODAL_COMPONENTS[modalName];

        let scrollable = false;
        if((type === M_TYPE.LAYER || type === M_TYPE.MENU) && index === topScrollIndex){
            scrollable = true;
        }


        return <ModalComponent scrollable={scrollable} windowBlocked={windowBlocked} key={modalName} {...props}/>
    });

    return createPortal(
        <>
            {renderModal}
        </>, document.getElementById('root')
    )
}

export default ModalContainer;