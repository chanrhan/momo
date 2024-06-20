import "../../css/layout.module.css"
import "../../css/calender.module.css"

export function ReserveMessage(){
    return (
        <div id="contents">
            <div className="sub">
                <div className="sub_head">
                    <h2 className="sub_title">예약전송함</h2>
                </div>

                <div className="calender">
                    <div className="calender_head">
                        <div className="calender_date">
                            <span className="date_text">2024년 4월</span>
                            <div className="date_box">
                                <button type="button" className="date_btn">달력</button>
                                <div className="date_popup active">
                                     {/*활성화시 active 추가 -->*/}
                                    <div className="popup_control">
                                        <span className="popup_year">2024년</span>
                                        <button type="button" className="popup_btn btn_prev">이전</button>
                                        <button type="button" className="popup_btn btn_next" disabled>다음</button>
                                    </div>
                                    <ul className="popup_list">
                                        <li className="popup_item"><button type="button">1월</button></li>
                                        <li className="popup_item"><button type="button">2월</button></li>
                                        <li className="popup_item"><button type="button">3월</button></li>
                                        <li className="popup_item active"><button type="button">4월</button></li>
                                         {/*선택된 월 active 추가 -->*/}
                                        <li className="popup_item"><button type="button" disabled>5월</button></li>
                                        <li className="popup_item"><button type="button" disabled>6월</button></li>
                                        <li className="popup_item"><button type="button" disabled>7월</button></li>
                                        <li className="popup_item"><button type="button" disabled>8월</button></li>
                                        <li className="popup_item"><button type="button" disabled>9월</button></li>
                                        <li className="popup_item"><button type="button" disabled>10월</button></li>
                                        <li className="popup_item"><button type="button" disabled>11월</button></li>
                                        <li className="popup_item"><button type="button" disabled>12월</button></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="calender_control">
                            <button type="button" className="calender_btn btn_arrow btn_prev" disabled>이전</button>
                            <button type="button" className="calender_btn btn_month">이번달</button>
                            <button type="button" className="calender_btn btn_arrow btn_next">다음</button>
                        </div>
                    </div>

                    <div className="calender_body">
                        <div className="calender_table">
                            <table className="tb_calender">
                                <caption>달력</caption>
                                <colgroup>
                                    <col span="6" style={{width:"calc(100% / 7)"}}/>
                                        <col/>
                                </colgroup>
                                <thead>
                                <tr>
                                    <th colSpan="col">일</th>
                                    <th colSpan="col">월</th>
                                    <th colSpan="col">화</th>
                                    <th colSpan="col">수</th>
                                    <th colSpan="col">목</th>
                                    <th colSpan="col">금</th>
                                    <th colSpan="col">토</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td></td>
                                    <td>
                                        <span className="num">1</span>
                                    </td>
                                    <td>
                                        <span className="num">2</span>
                                        <span className="stat blue">전송완료 5건</span>
                                    </td>
                                    <td>
                                        <span className="num">3</span>
                                    </td>
                                    <td>
                                        <span className="num">4</span>
                                    </td>
                                    <td>
                                        <span className="num">5</span>
                                    </td>
                                    <td>
                                        <span className="num">6</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className="num">7</span>
                                    </td>
                                    <td>
                                        <span className="num">8</span>
                                    </td>
                                    <td>
                                        <span className="num">9</span>
                                        <span className="stat grey">전송완료 3건</span>
                                    </td>
                                    <td>
                                        <span className="num">10</span>
                                        <span className="stat red">예약 안됨 4건</span>
                                    </td>
                                    <td>
                                        <span className="num">11</span>
                                    </td>
                                    <td>
                                        <span className="num">12</span>
                                    </td>
                                    <td>
                                        <span className="num">13</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className="num">14</span>
                                    </td>
                                    <td>
                                        <span className="num">15</span>
                                    </td>
                                    <td>
                                        <span className="num">16</span>
                                    </td>
                                    <td>
                                        <span className="num">17</span>
                                    </td>
                                    <td>
                                        <span className="num">18</span>
                                    </td>
                                    <td>
                                        <span className="num">19</span>
                                    </td>
                                    <td>
                                        <span className="num">20</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className="num">21</span>
                                    </td>
                                    <td>
                                        <span className="num">22</span>
                                    </td>
                                    <td>
                                        <span className="num">23</span>
                                    </td>
                                    <td>
                                        <span className="num">24</span>
                                    </td>
                                    <td className="today active">
                                        {/*오늘 날짜에 today 추가, 활성화시 active 추가 -->*/}
                                        <span className="num">25</span>
                                        <span className="stat blue">전송완료 5건</span>
                                    </td>
                                    <td>
                                        <span className="num">26</span>
                                    </td>
                                    <td>
                                        <span className="num">27</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className="num">28</span>
                                    </td>
                                    <td>
                                        <span className="num">29</span>
                                    </td>
                                    <td>
                                        <span className="num">30</span>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="calender_detail">
                            <div className="detail_head">
                                <div className="detail_date">2024년 4월 25일</div>
                                <div className="detail_count">일정 1개</div>
                                <button type="button" className="detail_arrow detail_prev">이전</button>
                                <button type="button" className="detail_arrow detail_next">다음</button>
                            </div>

                            <div className="detail_tab">
                                <ul className="tab_list">
                                    <li className="tab_item active"><button type="button" className="tab_btn">예약 안됨</button></li>
                                    {/*활성화시 active 추가 -->*/}
                                    <li className="tab_item"><button type="button" className="tab_btn">전송 예정</button></li>
                                    <li className="tab_item"><button type="button" className="tab_btn">전송 완료</button></li>
                                </ul>
                            </div>

                            <div className="detail_body">
                                <div className="detail_panel active">
                                    {/*활성화시 active 추가 -->*/}
                                    <table className="tb_calender2">
                                        <caption>예약 안됨 일정 테이블 - 이름, 기간, 내용, 전송 정보 제공</caption>
                                        <colgroup>
                                        </colgroup>
                                        <tbody>
                                        <tr>
                                            <td><span className="stat red">예약 안됨</span>김모모</td>
                                            <td>D-125</td>
                                            <td>부가서비스 해지</td>
                                            <td><button type="button" className="btn_kakao">전송</button></td>
                                        </tr>
                                        <tr>
                                            <td><span className="stat red">예약 안됨</span>김모모</td>
                                            <td>D-125</td>
                                            <td>부가서비스 해지</td>
                                            <td><button type="button" className="btn_kakao">전송</button></td>
                                        </tr>
                                        <tr>
                                            <td><span className="stat red">예약 안됨</span>김모모</td>
                                            <td>D-125</td>
                                            <td>부가서비스 해지</td>
                                            <td><button type="button" className="btn_kakao">전송</button></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="detail_panel">
                                    <table className="tb_calender2">
                                        <caption>전송 예정 일정 테이블 - 이름, 기간, 내용, 전송 정보 제공</caption>
                                        <colgroup>
                                        </colgroup>
                                        <tbody>
                                        <tr>
                                            <td><span className="stat grey">전송 예정</span>김모모</td>
                                            <td>D-125</td>
                                            <td>부가서비스 해지</td>
                                            <td>전송 예정</td>
                                        </tr>
                                        <tr>
                                            <td><span className="stat grey">전송 예정</span>김모모</td>
                                            <td>D-125</td>
                                            <td>부가서비스 해지</td>
                                            <td>전송 예정</td>
                                        </tr>
                                        <tr>
                                            <td><span className="stat grey">전송 예정</span>김모모</td>
                                            <td>D-125</td>
                                            <td>부가서비스 해지</td>
                                            <td>전송 예정</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="detail_panel">
                                    <table className="tb_calender2">
                                        <caption>전송 완료 일정 테이블 - 이름, 기간, 내용, 전송 정보 제공</caption>
                                        <colgroup>
                                        </colgroup>
                                        <tbody>
                                        <tr>
                                            <td><span className="stat blue">전송 완료</span>김모모</td>
                                            <td>D-125</td>
                                            <td>부가서비스 해지</td>
                                            <td>전송 완료</td>
                                        </tr>
                                        <tr>
                                            <td><span className="stat blue">전송 완료</span>김모모</td>
                                            <td>D-125</td>
                                            <td>부가서비스 해지</td>
                                            <td>전송 완료</td>
                                        </tr>
                                        <tr>
                                            <td><span className="stat blue">전송 완료</span>김모모</td>
                                            <td>D-125</td>
                                            <td>부가서비스 해지</td>
                                            <td>전송 완료</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}