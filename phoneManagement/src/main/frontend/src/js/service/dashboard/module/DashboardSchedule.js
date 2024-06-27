import Dashboard from "../../../../css/dashboard.module.css"
import {cm} from "../../../utils/cm";
import {DashboardScheduleItem} from "./DashboardScheduleItem";

// 캘린더는 나중에 라이브러리 사용할지 말지 결정한후 css 작업 들어가도 될듯
export function DashboardSchedule({}){
    return (
        <div className={cm(Dashboard.info_schedule, Dashboard.div)}>
            <div className={Dashboard.schedule_head}>
                <div className={cm(Dashboard.schedule_title)}>4월 일정</div>
                <div className={cm(Dashboard.schedule_control)}>
                    <button type="button" className={cm(Dashboard.schedule_btn, Dashboard.btn_today)}>오늘</button>
                    <button type="button" className={cm(Dashboard.schedule_btn, Dashboard.btn_arrow, Dashboard.btn_prev)} disabled>이전</button>
                    <button type="button" className={cm(Dashboard.schedule_btn, Dashboard.btn_arrow, "btn_next")}>이전</button>
                </div>
            </div>

            <div className={cm(Dashboard.schedule_body)}>
                <div className={cm(Dashboard.schedule_calender)}>
                    <table className={cm(Dashboard.tb_calender)}>
                        <caption>달력</caption>
                        <colgroup>
                            <col span="6" style={{width: "calc(100% / 7)"}}>
                            </col>
                        </colgroup>
                        <thead className={cm(Dashboard.thead)}>
                        <tr>
                            <th className={cm(Dashboard.th)} colSpan="col">월</th>
                            <th className={cm(Dashboard.th)} colSpan="col">화</th>
                            <th className={cm(Dashboard.th)} colSpan="col">수</th>
                            <th className={cm(Dashboard.th)} colSpan="col">목</th>
                            <th className={cm(Dashboard.th)} colSpan="col">금</th>
                            <th className={cm(Dashboard.th)} colSpan="col">토</th>
                            <th className={cm(Dashboard.th)} colSpan="col">일</th>
                        </tr>
                        </thead>
                        <tbody className={cm(Dashboard.tbody)}>
                        <tr>
                            <td className={cm(Dashboard.td)}>
                                <button className={cm(Dashboard.button)} type="button">1</button>
                            </td>
                            <td>
                                <button type="button">2</button>
                            </td>
                            <td>
                                <button type="button">3</button>
                            </td>
                            <td>
                                <button type="button">4</button>
                            </td>
                            <td>
                                <button type="button">5</button>
                            </td>
                            <td>
                                <button type="button">6</button>
                            </td>
                            <td>
                                <button type="button">7</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="button">8</button>
                            </td>
                            <td>
                                <button type="button">9</button>
                            </td>
                            <td>
                                <button type="button">10</button>
                            </td>
                            <td>
                                <button type="button">11</button>
                            </td>
                            <td>
                                <button type="button">12</button>
                            </td>
                            <td>
                                <button type="button">13</button>
                            </td>
                            <td>
                                <button type="button">14</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="button">15</button>
                            </td>
                            <td>
                                <button type="button" className="has">16</button>
                            </td>
                            {/*일정 있으면 has 추가 -->*/}
                            <td>
                                <button type="button" className="active has">17</button>
                            </td>
                            {/*활성화시 active 추가 -->*/}
                            <td>
                                <button type="button">18</button>
                            </td>
                            <td>
                                <button type="button">19</button>
                            </td>
                            <td>
                                <button type="button" className="has">20</button>
                            </td>
                            <td>
                                <button type="button" className="has">21</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="button">22</button>
                            </td>
                            <td>
                                <button type="button">23</button>
                            </td>
                            <td>
                                <button type="button">24</button>
                            </td>
                            <td>
                                <button type="button">25</button>
                            </td>
                            <td>
                                <button type="button">26</button>
                            </td>
                            <td>
                                <button type="button">27</button>
                            </td>
                            <td>
                                <button type="button">28</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="button">29</button>
                            </td>
                            <td>
                                <button type="button">30</button>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <ul className={cm(Dashboard.schedule_list)}>
                    <DashboardScheduleItem color='green' text='나모모 고객님과 대면 상담'/>
                    <DashboardScheduleItem color='blue' text='나모모 고객님과 대면 상담'/>
                    <DashboardScheduleItem color='yellow' text='나모모 고객님과 대면 상담'/>
                    <DashboardScheduleItem color='red' text='나모모 고객님과 대면 상담'/>
                    {/*<li className={cm(Dashboard.schedule_item)}>*/}
                    {/*    <span className={cm(Dashboard.schedule_mark, Dashboard.green)}></span>*/}
                    {/*    <span className={cm(Dashboard.schedule_text)}>나모모 고객님과 대면 상담</span>*/}
                    {/*    <button type="button" className={cm(Dashboard.schedule_del)}>삭제</button>*/}
                    {/*</li>*/}
                    {/*<li className="schedule_item">*/}
                    {/*    <span className="schedule_mark red"></span>*/}
                    {/*    <span className="schedule_text">팀 회의</span>*/}
                    {/*    <button type="button" className="schedule_del">삭제</button>*/}
                    {/*</li>*/}
                    {/*<li className="schedule_item active">*/}
                    {/*    <span className="schedule_mark blue"></span>*/}
                    {/*    <span className="schedule_text">나모모 고객님과 대면 상담</span>*/}
                    {/*    <button type="button" className="schedule_del">삭제</button>*/}
                    {/*</li>*/}
                    {/*<li className="schedule_item">*/}
                    {/*    <span className="schedule_mark yellow"></span>*/}
                    {/*    <span className="schedule_text">mou 일정</span>*/}
                    {/*    <button type="button" className="schedule_del">삭제</button>*/}
                    {/*</li>*/}
                </ul>
            </div>
        </div>
    )
}