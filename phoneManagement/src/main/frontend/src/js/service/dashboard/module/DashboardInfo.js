import {cm, cmc} from "../../../utils/cm";
import Dashboard from "../../../../css/dashboard.module.css";
import ProfileImg1 from "../../../../images/profile_img1.jpg"
import {DashboardSchedule} from "./DashboardSchedule";
import {Link} from "react-router-dom";

export function DashboardInfo({}){
    return (
        <div className={cm(Dashboard.dashboard_info, Dashboard.div)}>
            <div className={cm(Dashboard.info_company, Dashboard.div)}>
                <div className={cm(Dashboard.company_profile)}>
                        <span className={cm(Dashboard.profile_img)}><img src={ProfileImg1}
                                                           alt="프로필 이미지"/></span>
                    <span className={cm(Dashboard.profile_name)}>김모모<button type="button"
                                                              className={cm(Dashboard.profile_edit)}>수정</button></span>
                    <button type="button" className={`btn btn_blue btn_medium ${Dashboard.profile_btn}`}>초대하기</button>
                </div>

                <div className={cm(Dashboard.company_select)}>
                    <div className={cmc(Dashboard.select_box)}>
                        <input type="hidden" id=""/>
                        <button type="button" className={cmc(Dashboard.select_btn)}>울타리 평촌역점</button>
                        <ul className="select_layer">
                            {/*활성화시 active 추가 -->*/}
                            <li className="select_item">
                                <button type="button">울타리 평촌역점</button>
                            </li>
                            <li className="select_item">
                                <button type="button">울타리 일번가점</button>
                            </li>
                            <li className="select_item">
                                <button type="button">울타리 관양점</button>
                            </li>
                        </ul>
                    </div>
                    <div className={cmc(Dashboard.select_box)}>
                        <input type="hidden" id=""/>
                        <button type="button" className={cmc(Dashboard.select_btn)} disabled>직급/직책 선택</button>
                        <ul className="select_layer">
                            <li className="select_item">
                                <button type="button">팀원</button>
                            </li>
                            <li className="select_item">
                                <button type="button">점장</button>
                            </li>
                            <li className="select_item">
                                <button type="button">대표</button>
                            </li>
                        </ul>
                    </div>
                </div>

                <Link to='/shop/register'>
                    <button type="button" className={cm(Dashboard.company_add)}>매장 추가하기</button>
                </Link>
            </div>
            <DashboardSchedule/>
        </div>
    )
}