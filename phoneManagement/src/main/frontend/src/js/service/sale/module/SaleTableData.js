import Board from "../../../../css/board.module.css"
import profileImg1 from "../../../../images/profile_img1.jpg"
import {Btd} from "../../board/BoardTable";
import {cm} from "../../../utils/cm";
import {ProfileTableColumn} from "./ProfileTableColumn";
import {NumberUtils} from "../../../utils/NumberUtils";

export function SaleTableData({data, checked, onCheck, onClick}){
    return (
        <tr onClick={onClick}>
            <Btd name={`check${data.sale_id}`} checked={checked} onCheck={onCheck} checkbox/>
            <Btd>
                <span className={`${Board.td_type} ${Board.blue}`}>무선</span>
                <span className={`${Board.td_type} ${Board.orange}`}>유선</span>
                <span className={`${Board.td_type} ${Board.pink}`}>세컨</span>
            </Btd>
            <Btd>{data.actv_dt}</Btd>
            <Btd>
                <span className={cm(Board.td_num)}>1</span>{data.cust_nm}
            </Btd>
            <Btd className="ta_c">{data.cust_tel}</Btd>
            <Btd className="ta_r">{data.cust_cd}</Btd>
            <Btd className="ta_r">{data.device_nm}</Btd>
            <Btd className="ta_r">{NumberUtils.format(data.total_cms)} 원</Btd>
            <ProfileTableColumn src={profileImg1} name={data.seller_nm}/>
            <Btd className="ta_c">
                <button type="button" className="btn btn_grey btn_small btn_line">예약 확인</button>
            </Btd>
        </tr>
    )
}