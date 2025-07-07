import {LayerModal} from "../../common/modal/LayerModal";
import useModal from "../../hook/useModal";
import {ModalType} from "../../common/modal/ModalType";
import  Admin from "../../../css/admin.module.css"

export function VisitLogModal(props){
    const modal = useModal();

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Visit_Log)
    }

    return (
        <LayerModal {...props} maxWidth={700} top={45}>
            <div className={Admin.visit_log}>
                <div className={Admin.header_group}>
                    <div className={Admin.visit_log_title}>
                        방문 내역
                    </div>

                </div>
                <div className={Admin.visit_log_body}>
                    <div className={Admin.body_header_group}>
                        <input type='text' className={Admin.inp_search}/>
                        <button type='button' className={Admin.btn_search}>검색</button>
                    </div>
                    <ul className={Admin.log_list}>
                        <li className={Admin.visit_log_item}>
                            <span className={Admin.visit_count}>
                                1
                            </span>
                            <span className={Admin.visit_date}>
                                2025-05-08
                            </span>
                        </li>
                        <li className={Admin.visit_log_item}>
                            <span className={Admin.visit_count}>
                                2
                            </span>
                            <span className={Admin.visit_date}>
                                2025-05-10
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </LayerModal>
    )
}