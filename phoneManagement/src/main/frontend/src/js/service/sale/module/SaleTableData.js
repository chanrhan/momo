import Board from "../../../../css/board.module.css"
import profileImg1 from "../../../../images/profile_img1.jpg"
import {Btd} from "../../board/BoardTable";
import {cm} from "../../../utils/cm";
import {ProfileTableColumn} from "./ProfileTableColumn";

export function SaleTableData({}){
    return (
        <tr>
            {/*이거 varName 나중에 각자 구별될 수 있도로 바꿔줘야 함*/}
            <Btd varName='check3' checkbox/>
            {/*<Btd>*/}
            {/*    <span className={cm(Board.td_type, Board.blue)}>무선</span>*/}
            {/*    <span className={cm(Board.td_type, Board.orange)}>유선</span>*/}
            {/*    <span className={cm(Board.td_type, Board.pink)}>세컨</span>*/}
            {/*</Btd>*/}
            <Btd>
                <span className={`${Board.td_type} ${Board.blue}`}>무선</span>
                <span className={`${Board.td_type} ${Board.orange}`}>유선</span>
                <span className={`${Board.td_type} ${Board.pink}`}>세컨</span>
            </Btd>
            <Btd>2024.04.01</Btd>
            <Btd><span className={cm(Board.td_num)}>1</span> 나모모</Btd>
            <Btd className="ta_c">010-1234-5678</Btd>
            <Btd className="ta_r">971213</Btd>
            <Btd className="ta_r">S24U</Btd>
            <Btd className="ta_r">320,000원</Btd>
            <ProfileTableColumn src={profileImg1} name='나모모'/>
            <Btd className="ta_c">
                <button type="button" className="btn btn_grey btn_small btn_line">예약 확인</button>
            </Btd>
        </tr>
    )
}