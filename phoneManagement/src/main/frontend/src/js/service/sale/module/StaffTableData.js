import {cm} from "../../../utils/cm";
import Board from "../../../../css/board.module.css";
import profileImg1 from "../../../../images/profile_img1.jpg"
import {Btd} from "../../board/BoardTable";
import {ProfileTableColumn} from "./ProfileTableColumn";

export function StaffTableData({checkVarName, src, name}){
    return (
        <tr>
            <Btd checkbox name='check1'/>
            <ProfileTableColumn src={profileImg1} name='나모모'/>
            <Btd>
                <div className="select_box">
                    <input type="hidden" id=""/>
                    <button type="button" className={cm(Board.select_btn)}>울타리 일번가점</button>
                    <ul className="select_layer">
                        <li className="select_item">
                            <button type="button">울타리 평촌역점</button>
                        </li>
                        <li className="select_item active">
                            <button type="button">울타리 일번가점</button>
                        </li>
                        <li className="select_item">
                            <button type="button">울타리 관양점</button>
                        </li>
                    </ul>
                </div>
            </Btd>
            <Btd>
                <div className="select_box">
                    <input type="hidden" id=""/>
                    <button type="button" className={cm(Board.select_btn)}>점장</button>
                    <ul className="select_layer">
                        <li className="select_item">
                            <button type="button">팀원</button>
                        </li>
                        <li className="select_item active">
                            <button type="button">점장</button>
                        </li>
                        <li className="select_item">
                            <button type="button">대표</button>
                        </li>
                    </ul>
                </div>
            </Btd>
            <Btd>
                <button type="button" className="btn btn_grey btn_small btn_line">승인</button>
                <button type="button" className="btn btn_grey btn_small btn_line">거절</button>
                {/*<button type="button" className="btn btn_blue btn_small btn_line">승인 완료</button>*/}
            </Btd>
        </tr>
    )
}