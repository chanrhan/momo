import Board from "../../../css/board.module.css"
import profileImg1 from "../../../images/profile_img1.jpg"
import {Btd} from "../../service/board/BoardTable";
import {ProfileTableColumn} from "../../service/sale/module/ProfileTableColumn";

export function AdminTableData({}){
    return (
        <tr>
            <Btd checkbox/>
            <Btd>100</Btd>
            <Btd>-</Btd>
            <ProfileTableColumn src={profileImg1} name='김모모'/>
            <Btd className="ta_c">momoadmin@momo.com</Btd>
            <Btd className="ta_c">010-1234-5678</Btd>
            <Btd className="ta_c">등록</Btd>
            <Btd className="ta_c">2024-04-04</Btd>
            <Btd className="ta_c">2024-04-04</Btd>
            <Btd className="ta_c">대표</Btd>
            <Btd className="ta_c">
                <a href="#" className="btn btn_grey btn_small btn_line">관리</a>
            </Btd>
        </tr>
    )
}