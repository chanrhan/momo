import Admin from "../../css/admin.module.css";
import useModal from "../hook/useModal";
import {cm} from "../utils/cm";

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
                            수원점
                        </div>
                        <div className={Admin.description_box}>
                            <div className={Admin.address_text}>
                                경기도 수원시 sadsadsadsadsadsdsdsadasas
                            </div>
                            <ul className={Admin.shop_label_list}>
                                <li className={Admin.shop_label_item}>

                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={Admin.detail_body}>
                        <div className={Admin.info_panel}>
                            <div className={Admin.detail_inp_cont}>
                                <div className={Admin.title}>
                                    담당자 정보
                                </div>
                                <div className={Admin.grid_items}>
                                    <div className={Admin.info_item}>
                                        <span className={Admin.subject_text}>이름</span>
                                        <input type="text" className={Admin.inp}/>
                                    </div>
                                    <div className={Admin.info_item}>
                                        <span className={Admin.subject_text}>번호</span>
                                        <input type="text" className={Admin.inp}/>
                                    </div>
                                    <div className={Admin.info_item}>
                                        <span className={Admin.subject_text}>성별</span>
                                        <input type="text" className={Admin.inp}/>
                                    </div>
                                    <div className={Admin.info_item}>
                                        <span className={Admin.subject_text}>직급</span>
                                        <input type="text" className={Admin.inp}/>
                                    </div>
                                </div>
                                <div className={Admin.name_card_box}>
                                    <span className={Admin.subject_text}>명함</span>
                                    <input id="name_card" type="file" className={Admin.file_box}/>
                                    <label htmlFor="name_card" className={Admin.file_label}></label>
                                </div>
                            </div>
                            <div className={Admin.memo_cont}>
                                <span className={Admin.title}>메모</span>
                                <textarea className={Admin.content}>

                                </textarea>
                            </div>
                        </div>
                        <div className={Admin.visit_log_panel}>
                            <div className={Admin.title}>
                                방문 내역
                            </div>
                            <table className={Admin.visit_log_table}>
                                <thead>
                                    <tr>
                                        <th>방문 날짜</th>
                                        <th>판매자</th>
                                        <th>메모</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            1234
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}