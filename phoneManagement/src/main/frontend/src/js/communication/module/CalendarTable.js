import Calender from "../../../css/calendar.module.css";
import {cm, cmc} from "../../utils/cm";
import {repeat} from "lodash";
import {DateUtils} from "../../utils/DateUtils";
import {CalendarDetail} from "./CalendarDetail";

export function CalendarTable({today}){
    const {startDay, totalDays} = DateUtils.getMonthInfo(today.getFullYear(), today.getMonth()+1);

    const totalWeek = Math.ceil((startDay + totalDays) / 7);


    return (
        <div className={cm(Calender.calender_body, Calender.div)}>
            <div className={Calender.calender_table}>
                <table className={Calender.tb_calender}>
                    <caption>달력</caption>
                    <colgroup>
                        <col span="6" style={{width: "calc(100% / 7)"}}/>
                        <col/>
                    </colgroup>
                    <thead className={Calender.thead}>
                    <tr>
                        <Cth>일</Cth>
                        <Cth>월</Cth>
                        <Cth>화</Cth>
                        <Cth>수</Cth>
                        <Cth>목</Cth>
                        <Cth>금</Cth>
                        <Cth>토</Cth>
                    </tr>
                    </thead>
                    <tbody className={Calender.tbody}>
                    {
                        new Array(totalWeek).fill(0).map((v, week)=>{
                            return <tr>
                                {
                                    new Array(7).fill(0).map((v,day)=>{
                                        const d = (week*7) + day - startDay + 1;
                                        return <Cdate today={today.getDate() === d}
                                                      day={(d > 0 && d <= totalDays) && d}>
                                            {/*do something*/}
                                            {/*<span className="stat blue">전송완료 5건</span>*/}
                                        </Cdate>
                                    })
                                }
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>

            <div className={Calender.calender_detail}>
                <div className={Calender.detail_head}>
                    <div className={Calender.detail_date}>2024년 4월 25일</div>
                    <div className={Calender.detail_count}>일정 1개</div>
                    <button type="button" className={cm(Calender.detail_arrow, Calender.detail_prev)}>이전</button>
                    <button type="button" className={cm(Calender.detail_arrow, Calender.detail_next)}>다음</button>
                </div>

                <div className={Calender.detail_tab}>
                    <ul className="tab_list">
                        <li className={cmc(Calender.tab_item, Calender.active)}>
                            <button type="button" className={cmc(Calender.tab_btn)}>예약 안됨</button>
                        </li>
                        {/*활성화시 active 추가 -->*/}
                        <li className={cmc(Calender.tab_item)}>
                            <button type="button" className={cmc(Calender.tab_btn)}>전송 예정</button>
                        </li>
                        <li className={cmc(Calender.tab_item)}>
                            <button type="button" className={cmc(Calender.tab_btn)}>전송 완료</button>
                        </li>
                        {/*<li className="tab_item">*/}
                        {/*    <button type="button" className="tab_btn">전송 예정</button>*/}
                        {/*</li>*/}
                        {/*<li className="tab_item">*/}
                        {/*    <button type="button" className="tab_btn">전송 완료</button>*/}
                        {/*</li>*/}
                    </ul>
                </div>

                <div className={Calender.detail_body}>
                    <div className={cm(Calender.detail_panel, Calender.active)}>
                        {/*활성화시 active 추가 -->*/}
                        <table className={Calender.tb_calender2}>
                            <caption>예약 안됨 일정 테이블 - 이름, 기간, 내용, 전송 정보 제공</caption>
                            <colgroup>
                            </colgroup>
                            <tbody>
                            <CalendarDetail username='김모모' color='red' content='부가서비스 해지'/>
                            <CalendarDetail username='김모모' color='blue' content='중고폰 판매'/>
                            <CalendarDetail username='김모모' color='red' content='결합 해지'/>
                            </tbody>
                        </table>
                    </div>

                    {/*<div className={Calender.detail_panel}>*/}
                    {/*    <table className="tb_calender2">*/}
                    {/*        <caption>전송 예정 일정 테이블 - 이름, 기간, 내용, 전송 정보 제공</caption>*/}
                    {/*        <colgroup>*/}
                    {/*        </colgroup>*/}
                    {/*        <tbody>*/}
                    {/*        <tr>*/}
                    {/*            <td><span className="stat grey">전송 예정</span>김모모</td>*/}
                    {/*            <td>D-125</td>*/}
                    {/*            <td>부가서비스 해지</td>*/}
                    {/*            <td>전송 예정</td>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <td><span className="stat grey">전송 예정</span>김모모</td>*/}
                    {/*            <td>D-125</td>*/}
                    {/*            <td>부가서비스 해지</td>*/}
                    {/*            <td>전송 예정</td>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <td><span className="stat grey">전송 예정</span>김모모</td>*/}
                    {/*            <td>D-125</td>*/}
                    {/*            <td>부가서비스 해지</td>*/}
                    {/*            <td>전송 예정</td>*/}
                    {/*        </tr>*/}
                    {/*        </tbody>*/}
                    {/*    </table>*/}
                    {/*</div>*/}

                    {/*<div className="detail_panel">*/}
                    {/*    <table className="tb_calender2">*/}
                    {/*        <caption>전송 완료 일정 테이블 - 이름, 기간, 내용, 전송 정보 제공</caption>*/}
                    {/*        <colgroup>*/}
                    {/*        </colgroup>*/}
                    {/*        <tbody>*/}
                    {/*        <tr>*/}
                    {/*            <td><span className="stat blue">전송 완료</span>김모모</td>*/}
                    {/*            <td>D-125</td>*/}
                    {/*            <td>부가서비스 해지</td>*/}
                    {/*            <td>전송 완료</td>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <td><span className="stat blue">전송 완료</span>김모모</td>*/}
                    {/*            <td>D-125</td>*/}
                    {/*            <td>부가서비스 해지</td>*/}
                    {/*            <td>전송 완료</td>*/}
                    {/*        </tr>*/}
                    {/*        <tr>*/}
                    {/*            <td><span className="stat blue">전송 완료</span>김모모</td>*/}
                    {/*            <td>D-125</td>*/}
                    {/*            <td>부가서비스 해지</td>*/}
                    {/*            <td>전송 완료</td>*/}
                    {/*        </tr>*/}
                    {/*        </tbody>*/}
                    {/*    </table>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    )
}

function Cth({children}){
    return (
        <th className={Calender.th} colSpan="col">
            {children}
        </th>
    )
}

function Cdate({day, today, active, children}){
    return (
        <td className={`${Calender.td} ${today && Calender.today} ${active && Calender.active}`}>
            <span className={Calender.num}>{day}</span>
            {children}
        </td>
    )
}