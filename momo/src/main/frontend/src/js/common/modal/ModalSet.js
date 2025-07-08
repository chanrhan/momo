import {AdminBulkUploadModal} from "../../admin/modal/AdminBulkUploadModal";
import {MessageTemplateModal} from "../../admin/modal/MessageTemplateModal";
import {DynamicSelectModal} from "./DynamicSelectModal";
import {MoreOptionModal} from "./menu/MoreOptionModal";
import {InviteModal} from "../../service/dashboard/module/InviteModal";
import {ChargePointModal} from "../../profile/modal/ChargePointModal";
import AlertModal from "./snackbar/AlertModal";
import {ImagePreviewModal} from "./layer/ImagePreviewModal";
import {SelectSheetModal} from "../../service/bulk_upload/SelectSheetModal";
import {AddressApiModal} from "../../shop/modal/AddressApiModal";
import {HintModal} from "./tooptip/HintModal";
import {PaymentCardModal} from "../../profile/modal/PaymentCardModal";
import {TodoAddModal} from "../../service/dashboard/module/TodoAddModal";
import {UpdatePasswordModal} from "../../profile/modal/UpdatePasswordModal";
import {NameCardModal} from "../../profile/modal/NameCardModal";
import ChangeNicknameModal from "../../account/modal/ChangeNicknameModal";
import AddShopModal from "../../shop/modal/AddShopModal";
import MenuModalTest from "../../test/MenuModalTest";
import SaleDetailModal from "../../service/sale/detail/SaleDetailModal";
import SecondDeviceSearchModal from "../../service/sale/modal/SecondDeviceSearchModal";
import SaleCardModal from "../../service/sale/modal/SaleCardModal";
import SaleCombModal from "../../service/sale/modal/SaleCombModal";
import SaleExsvcModal from "../../service/sale/modal/SaleExsvcModal";
import {SaleWtPlanModal} from "../../service/sale/modal/SaleWtPlanModal";
import SaleUsedDeviceModal from "../../service/sale/modal/SaleUsedDeviceModal";
import {DeviceRecommendModal} from "../../service/bulk_upload/DeviceRecommendModal";
import {DeviceSearchModal} from "../../service/sale/modal/DeviceSearchModal";
import {PlanSearchModal} from "../../service/sale/modal/PlanSearchModal";
import TableHeaderSelectModal from "../../test/TableHeaderSelectModal";
import SaleDataValidationModal from "../../service/sale/modal/SaleDataValidationModal";
import {DateSelectModule} from "./menu/DateSelectModule";
import {SaleFilterModal} from "../../service/sale/modal/SaleFilterModal";
import {ReserveMessageModal} from "../../service/sale/modal/ReserveMessageModal";
import {ReserveDateModal} from "../../service/sale/modal/ReserveDateModal";
import {MessagePreviewModal} from "../../service/sale/modal/MessagePreviewModal";
import {UsedDeviceCmsModal} from "../../service/task/modal/TaskUsedDeviceCmsModal";
import {WarningModal} from "./snackbar/WarningModal";
import {InfoModal} from "./snackbar/InfoModal";
import {ConfirmModal} from "./snackbar/ConfirmModal";
import {AddStudyNodeModal} from "../../study_private/modal/AddStudyNodeModal";
import {VisitLogModal} from "../../admin/modal/VisitLogModal";
import {AddVisitShopModal} from "../../admin/modal/AddVisitShopModal";

export const ModalSet = {
    // admin
    AdminBulkUpload: AdminBulkUploadModal,
    AdminMessageTemplate: MessageTemplateModal,
    VisitLog: VisitLogModal,
    AddVisitShop: AddVisitShopModal,

    // common
    DynamicSelect: DynamicSelectModal,
    MoreOption: MoreOptionModal,
    Invite: InviteModal,
    ChargePoint: ChargePointModal,
    Alert: AlertModal,
    ImagePreview: ImagePreviewModal,
    SelectSheet: SelectSheetModal,

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

    DeviceRecommend: DeviceRecommendModal,

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
    MessagePreview: MessagePreviewModal,

    // Task
    UsedDeviceCms: UsedDeviceCmsModal,

    // error
    Warning: WarningModal,
    Info: InfoModal,

    Confirm: ConfirmModal,
    // study private
    AddStudyNode: AddStudyNodeModal
}