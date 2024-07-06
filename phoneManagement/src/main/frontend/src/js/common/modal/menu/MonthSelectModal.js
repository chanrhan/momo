import {cm} from "../../../utils/cm";
import Calender from "../../../../css/calendar.module.css";
import {MenuModal} from "../MenuModal";

export function MonthSelectModal({active}){
    return (
        <MenuModal>
            <div className={cm(Calender.date_popup, `${active && Calender.active}`)}>
                {/*활성화시 active 추가 -->*/}
                <div className={Calender.popup_control}>
                    <span className={Calender.popup_year}>2024년</span>
                    <button type="button" className={cm(Calender.control_btn, Calender.btn_prev)}>이전</button>
                    <button type="button" className={cm(Calender.control_btn, Calender.btn_next)} disabled>다음</button>
                </div>
                <ul className={Calender.popup_list}>
                    {
                        new Array(12).fill(0).map((v, index) => {
                            return <li className={Calender.popup_item}>
                                <button type="button" className={Calender.popup_btn}>{index + 1}월</button>
                            </li>
                        })
                    }
                    {/*<li className="popup_item">*/}
                    {/*    <button type="button">2월</button>*/}
                    {/*</li>*/}
                    {/*<li className="popup_item">*/}
                    {/*    <button type="button">3월</button>*/}
                    {/*</li>*/}
                    {/*<li className="popup_item active">*/}
                    {/*    <button type="button">4월</button>*/}
                    {/*</li>*/}
                    {/*/!*선택된 월 active 추가 -->*!/*/}
                    {/*<li className="popup_item">*/}
                    {/*    <button type="button" disabled>5월</button>*/}
                    {/*</li>*/}
                    {/*<li className="popup_item">*/}
                    {/*    <button type="button" disabled>6월</button>*/}
                    {/*</li>*/}
                    {/*<li className="popup_item">*/}
                    {/*    <button type="button" disabled>7월</button>*/}
                    {/*</li>*/}
                    {/*<li className="popup_item">*/}
                    {/*    <button type="button" disabled>8월</button>*/}
                    {/*</li>*/}
                    {/*<li className="popup_item">*/}
                    {/*    <button type="button" disabled>9월</button>*/}
                    {/*</li>*/}
                    {/*<li className="popup_item">*/}
                    {/*    <button type="button" disabled>10월</button>*/}
                    {/*</li>*/}
                    {/*<li className="popup_item">*/}
                    {/*    <button type="button" disabled>11월</button>*/}
                    {/*</li>*/}
                    {/*<li className="popup_item">*/}
                    {/*    <button type="button" disabled>12월</button>*/}
                    {/*</li>*/}
                </ul>
            </div>
        </MenuModal>
    )
}