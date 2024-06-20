import "../../css/dashboard.css"
// import "../../css/layout.module.css"

export function Main(){
    return (
        <div id="contents">
            <div className="dashboard">
                <div className="dashboard_panel">
                    <div className="panel_head">
                        <span className="panel_greeting">안녕하세요, 박상인 점장 님 !</span>
                        <span className="panel_standard">2024년 4월 <span>매장</span> 기준</span>
                    </div>
                    <div className="panel_body">
                        <div className="panel_group">
                            <div className="panel n1">
                                <ul className="panel_list">
                                    <li className="panel_item">
                                        <div className="panel_title">무선</div>
                                        <div className="panel_num"><span>9</span>대</div>
                                        <div className="panel_per up"><span className="per_arrow">▲</span> 1.2%<span className="per_text">(전월 대비)</span></div>
                                    </li>
                                    <li className="panel_item">
                                        <div className="panel_title">인터넷</div>
                                        <div className="panel_num"><span>9</span>대</div>
                                        <div className="panel_per up"><span className="per_arrow">▲</span> 1.2%<span className="per_text">(전월 대비)</span></div>
                                    </li>
                                    <li className="panel_item">
                                        <div className="panel_title">TV</div>
                                        <div className="panel_num"><span>9</span>대</div>
                                        <div className="panel_per up"><span className="per_arrow">▲</span> 1.2%<span className="per_text">(전월 대비)</span></div>
                                    </li>
                                    <li className="panel_item">
                                        <div className="panel_title">총 이익</div>
                                        <div className="panel_num"><span>9</span>대</div>
                                        <div className="panel_per up"><span className="per_arrow">▲</span> 1.2%<span className="per_text">(전월 대비)</span></div>
                                    </li>
                                    <li className="panel_item">
                                        <div className="panel_title">평균 이익</div>
                                        <div className="panel_num"><span>9</span>대</div>
                                        <div className="panel_per down"><span className="per_arrow">▼</span> 1.2%<span className="per_text">(전월 대비)</span></div>
                                    </li>
                                </ul>
                            </div>

                            <div className="panel n2">
                                <ul className="panel_list">
                                    <li className="panel_item">
                                        <span className="panel_title">카드</span>
                                        <span className="panel_num">3/2</span>
                                        <span className="panel_per up"><span>40</span>%</span>
                                    </li>
                                    <li className="panel_item">
                                        <span className="panel_title">세컨</span>
                                        <span className="panel_num">3/2</span>
                                        <span className="panel_per up"><span>40</span>%</span>
                                    </li>
                                    <li className="panel_item">
                                        <span className="panel_title">부가서비스</span>
                                        <span className="panel_num">3/2</span>
                                        <span className="panel_per up"><span>40</span>%</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="panel_group">
                            <div className="panel n3">
                                <div className="panel_chart">
                                    <p className="chart_text">3월 1일 ~ 3월 11일 실적 대비<br/>121,000원 늘었어요.</p>

                                    <div className="chart_tab">
                                        <ul className="tab_list">
                                            <li className="tab_item active"><button type="button" className="tab_btn">무선</button></li>
                                             {/*활성화시 active 추가 -->*/}
                                            <li className="tab_item"><button type="button" className="tab_btn">인터넷</button></li>
                                            <li className="tab_item"><button type="button" className="tab_btn">TV</button></li>
                                            <li className="tab_item"><button type="button" className="tab_btn">총이익</button></li>
                                            <li className="tab_item"><button type="button" className="tab_btn">평균이익</button></li>
                                        </ul>
                                    </div>

                                    <div className="chart_panel_wrap">
                                        <div className="chart_panel active">
                                             {/*활성화시 active 추가 */}
                                            <div className="chart_map">차트 영역</div>

                                            <div className="chart_panel_tab">
                                                <ul className="tab_list">
                                                    <li className="tab_item active"><button type="button" className="tab_btn">일별</button></li>
                                                     {/*활성화시 active 추가 -->*/}
                                                    <li className="tab_item"><button type="button" className="tab_btn">주별</button></li>
                                                    <li className="tab_item"><button type="button" className="tab_btn">월별</button></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="chart_panel">
                                            <div className="chart_map">인터넷 차트 영역</div>

                                            <div className="chart_panel_tab">
                                                <ul className="tab_list">
                                                    <li className="tab_item active"><button type="button" className="tab_btn">일별</button></li>
                                                     {/*활성화시 active 추가 -->*/}
                                                    <li className="tab_item"><button type="button" className="tab_btn">주별</button></li>
                                                    <li className="tab_item"><button type="button" className="tab_btn">월별</button></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="chart_panel">
                                            <div className="chart_map">TV 차트 영역</div>

                                            <div className="chart_panel_tab">
                                                <ul className="tab_list">
                                                    <li className="tab_item active"><button type="button" className="tab_btn">일별</button></li>
                                                     {/*활성화시 active 추가 -->*/}
                                                    <li className="tab_item"><button type="button" className="tab_btn">주별</button></li>
                                                    <li className="tab_item"><button type="button" className="tab_btn">월별</button></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="chart_panel">
                                            <div className="chart_map">총이익 차트 영역</div>

                                            <div className="chart_panel_tab">
                                                <ul className="tab_list">
                                                    <li className="tab_item active"><button type="button" className="tab_btn">일별</button></li>
                                                     {/*활성화시 active 추가 -->*/}
                                                    <li className="tab_item"><button type="button" className="tab_btn">주별</button></li>
                                                    <li className="tab_item"><button type="button" className="tab_btn">월별</button></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="chart_panel">
                                            <div className="chart_map">평균이익 차트 영역</div>

                                            <div className="chart_panel_tab">
                                                <ul className="tab_list">
                                                    <li className="tab_item active"><button type="button" className="tab_btn">일별</button></li>
                                                    {/*활성화시 active 추가 */}
                                                    <li className="tab_item"><button type="button" className="tab_btn">주별</button></li>
                                                    <li className="tab_item"><button type="button" className="tab_btn">월별</button></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel n4">
                                <div className="panel_name">미완료 업무</div>
                                <ul className="panel_list">
                                    <li className="panel_item">
                                        <span className="panel_title">카드</span>
                                        <span className="panel_num">3/2</span>
                                        <span className="panel_per"><span>40</span>%</span>
                                    </li>
                                    <li className="panel_item">
                                        <span className="panel_title">카드</span>
                                        <span className="panel_num">3/2</span>
                                        <span className="panel_per"><span>40</span>%</span>
                                    </li>
                                    <li className="panel_item">
                                        <span className="panel_title">카드</span>
                                        <span className="panel_num">3/2</span>
                                        <span className="panel_per"><span>40</span>%</span>
                                    </li>
                                    <li className="panel_item">
                                        <span className="panel_title">카드</span>
                                        <span className="panel_num">3/2</span>
                                        <span className="panel_per"><span>40</span>%</span>
                                    </li>
                                    <li className="panel_item">
                                        <span className="panel_title">카드</span>
                                        <span className="panel_num">3/2</span>
                                        <span className="panel_per"><span>40</span>%</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="panel_group">
                            <div className="panel n5">
                                <button type="button" className="btn btn_blue btn_small btn_add_icon">추가</button>
                                <ul className="panel_list">
                                    <li className="panel_item">
                                        <div className="panel_item_head">
                                            <input type="text" className="panel_item_text" value="TEXT 입력"/>
                                                <button type="button" className="panel_item_del">삭제</button>
                                        </div>
                                        <div className="panel_item_body">
                                            <button type="button" className="panel_item_add">추가</button>
                                        </div>

                                        <li className="panel_item">
                                            <div className="panel_item_head">
                                                <input type="text" className="panel_item_text" value="TEXT 입력"/>
                                                    <button type="button" className="panel_item_del">삭제</button>
                                            </div>
                                            <div className="panel_item_body">
                                                <button type="button" className="panel_item_add">추가</button>
                                            </div>
                                        </li>
                                        <li className="panel_item">
                                            <div className="panel_item_head">
                                                <input type="text" className="panel_item_text" value="TEXT 입력"/>
                                                    <button type="button" className="panel_item_del">삭제</button>
                                            </div>
                                            <div className="panel_item_body">
                                                <button type="button" className="panel_item_add">추가</button>
                                            </div>
                                        </li>
                                        <li className="panel_item">
                                            <div className="panel_item_head">
                                                <input type="text" className="panel_item_text" value="TEXT 입력"/>
                                                    <button type="button" className="panel_item_del">삭제</button>
                                            </div>
                                            <div className="panel_item_body">
                                                <button type="button" className="panel_item_add">추가</button>
                                            </div>
                                        </li>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="dashboard_info">
                    <div className="info_company">
                        <div className="company_profile">
                            <span className="profile_img"><img src={require("../../images/profile_img1.jpg")} alt="프로필 이미지"/></span>
                            <span className="profile_name">김모모<button type="button" className="profile_edit">수정</button></span>
                            <button type="button" className="btn btn_blue btn_medium profile_btn">초대하기</button>
                        </div>

                        <div className="company_select">
                            <div className="select_box">
                                <input type="hidden" id=""/>
                                    <button type="button" className="select_btn">울타리 평촌역점</button>
                                    <ul className="select_layer">
                                         {/*활성화시 active 추가 -->*/}
                                        <li className="select_item active"><button type="button">울타리 평촌역점</button></li>
                                        <li className="select_item"><button type="button">울타리 일번가점</button></li>
                                        <li className="select_item"><button type="button">울타리 관양점</button></li>
                                    </ul>
                            </div>
                            <div className="select_box">
                                <input type="hidden" id=""/>
                                    <button type="button" className="select_btn" disabled>직급/직책 선택</button>
                                    <ul className="select_layer">
                                        <li className="select_item"><button type="button">팀원</button></li>
                                        <li className="select_item"><button type="button">점장</button></li>
                                        <li className="select_item"><button type="button">대표</button></li>
                                    </ul>
                            </div>
                        </div>

                        <button type="button" className="company_add">매창 추가하기</button>
                    </div>

                    <div className="info_schedule">
                        <div className="schedule_head">
                            <div className="schedule_title">4월 일정</div>
                            <div className="schedule_control">
                                <button type="button" className="schedule_btn btn_today">오늘</button>
                                <button type="button" className="schedule_btn btn_arrow btn_prev" disabled>이전</button>
                                <button type="button" className="schedule_btn btn_arrow btn_next">다음</button>
                            </div>
                        </div>

                        <div className="schedule_body">
                            <div className="schedule_calender">
                                <table className="tb_calender">
                                    <caption>달력</caption>
                                    <colgroup>
                                        <col span="6" style={{width:"calc(100% / 7)"}}>
                                            </col>
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th colSpan="col">월</th>
                                        <th colSpan="col">화</th>
                                        <th colSpan="col">수</th>
                                        <th colSpan="col">목</th>
                                        <th colSpan="col">금</th>
                                        <th colSpan="col">토</th>
                                        <th colSpan="col">일</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td><button type="button">1</button></td>
                                        <td><button type="button">2</button></td>
                                        <td><button type="button">3</button></td>
                                        <td><button type="button">4</button></td>
                                        <td><button type="button">5</button></td>
                                        <td><button type="button">6</button></td>
                                        <td><button type="button">7</button></td>
                                    </tr>
                                    <tr>
                                        <td><button type="button">8</button></td>
                                        <td><button type="button">9</button></td>
                                        <td><button type="button">10</button></td>
                                        <td><button type="button">11</button></td>
                                        <td><button type="button">12</button></td>
                                        <td><button type="button">13</button></td>
                                        <td><button type="button">14</button></td>
                                    </tr>
                                    <tr>
                                        <td><button type="button">15</button></td>
                                        <td><button type="button" className="has">16</button></td>
                                        {/*일정 있으면 has 추가 -->*/}
                                        <td><button type="button" className="active has">17</button></td>
                                         {/*활성화시 active 추가 -->*/}
                                        <td><button type="button">18</button></td>
                                        <td><button type="button">19</button></td>
                                        <td><button type="button" className="has">20</button></td>
                                        <td><button type="button" className="has">21</button></td>
                                    </tr>
                                    <tr>
                                        <td><button type="button">22</button></td>
                                        <td><button type="button">23</button></td>
                                        <td><button type="button">24</button></td>
                                        <td><button type="button">25</button></td>
                                        <td><button type="button">26</button></td>
                                        <td><button type="button">27</button></td>
                                        <td><button type="button">28</button></td>
                                    </tr>
                                    <tr>
                                        <td><button type="button">29</button></td>
                                        <td><button type="button">30</button></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <ul className="schedule_list">
                                <li className="schedule_item">
                                    <span className="schedule_mark green"></span>
                                    <span className="schedule_text">나모모 고객님과 대면 상담</span>
                                    <button type="button" className="schedule_del">삭제</button>
                                </li>
                                <li className="schedule_item">
                                    <span className="schedule_mark red"></span>
                                    <span className="schedule_text">팀 회의</span>
                                    <button type="button" className="schedule_del">삭제</button>
                                </li>
                                <li className="schedule_item active">
                                    <span className="schedule_mark blue"></span>
                                    <span className="schedule_text">나모모 고객님과 대면 상담</span>
                                    <button type="button" className="schedule_del">삭제</button>
                                </li>
                                <li className="schedule_item">
                                    <span className="schedule_mark yellow"></span>
                                    <span className="schedule_text">mou 일정</span>
                                    <button type="button" className="schedule_del">삭제</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}