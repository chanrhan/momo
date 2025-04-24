import Admin from "../../css/admin.module.css";
import useModal from "../hook/useModal";

export function AdminVisitMap(){
    const modal = useModal()

    return (
        <div className={Admin.admin_base_panel}>
            <div className={Admin.header_group}>
                <div className={Admin.title}>
                    매장 방문 내역
                </div>
            </div>

            <div className={Admin.body_group}>
                <div className={Admin.map_panel}>
                    <div className={Admin.map_cont}>

                    </div>
                    <div className={Admin.shop_list_panel}>

                    </div>
                </div>
                <div className={Admin.detail_panel}>
                    <div className={Admin.detail_header}>
                        <div className={Admin.shop_nm_box}>

                        </div>
                        <ul className={Admin.shop_label_list}>
                            <li className={Admin.shop_label_item}>

                            </li>
                        </ul>
                    </div>
                    <div className={Admin.detail_body}>
                        <div className={Admin.info_panel}>
                            <div className={Admin.detail_inp_box}>
                                <div className={Admin.detail_inp}>

                                </div>
                            </div>
                            <div className={Admin.memo_cont}>
                                <div className={Admin.content}>

                                </div>
                            </div>
                        </div>

                        <ul className={Admin.visit_log_list}>
                            <li className={Admin.visit_log_item}>

                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}