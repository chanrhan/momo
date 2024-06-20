import "../../css/board.module.css"
import "../../css/layout.module.css"

export function ManageCustomer(){
    return (
        <div id="contents">
            <div className="sub">
                <div className="sub_head">
                    <h2 className="sub_title">고객관리</h2>
                </div>

                <div className="sub_tab">
                    <ul className="tab_list">
                        <li className="tab_item active"><a href="#" className="tab_btn">중고폰</a></li>
                         {/*활성화시 active 추가 -->*/}
                        <li className="tab_item"><a href="#" className="tab_btn">카드</a></li>
                        <li className="tab_item"><a href="#" className="tab_btn">결합</a></li>
                        <li className="tab_item"><a href="#" className="tab_btn">지원</a></li>
                        <li className="tab_item"><a href="#" className="tab_btn">고객약속</a></li>
                    </ul>
                </div>

                <div className="board board_list">
                    <div className="board_head">
                        <form>
                            <div className="board_head_group">
                                <span className="switch">
                                    <input type="checkbox" id="switch" className="switch_inp" checked/>
                                    <label htmlFor="switch"><span>on/off</span></label>
                                </span>
                                <span className="switch_text">미완료 고객 보기</span>
                            </div>
                            <div className="board_head_group">
                                <div className="board_count">
                                    <span className="count_text">전체 <em>1,123</em>건</span>
                                    <span className="count_text"><em>3</em>건</span>
                                </div>

                                <div className="board_search">
                                    <input type="search" title="검색" id="board_search" placeholder="이름, 전화번호, 식별번호 검색"/>
                                        <button type="submit">검색</button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="board_body">
                        <table className="td_board">
                            <caption>고객관리 테이블 - 선택, 진행 사항, 개통날짜, 이름, 휴대폰 번호, 식별 번호, 중고폰, 판매 금액, 총 이익, 담당자, 전송 정보 제공</caption>
                            <thead>
                            <tr>
                                <th scope="col" className="ta_c">
                                    <div className="check_box">
                                        <input type="checkbox" id="check_all"/>
                                            <label htmlFor="check_all">선택</label>
                                    </div>
                                </th>
                                <th scope="col">진행 사항</th>
                                <th scope="col" className="sort">개통날짜</th>
                                <th scope="col">이름</th>
                                <th scope="col" className="ta_c">휴대폰 번호</th>
                                <th scope="col" className="ta_r">식별 번호</th>
                                <th scope="col" className="ta_r">중고폰</th>
                                <th scope="col" className="ta_r">판매 금액</th>
                                <th scope="col" className="ta_r">총 이익</th>
                                <th scope="col" className="ta_r">담당자</th>
                                <th scope="col" className="ta_c">전송</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="ta_c">
                                    <div className="check_box">
                                        <input type="checkbox" id="check" checked/>
                                            <label htmlFor="check">선택</label>
                                    </div>
                                </td>
                                <td>
                                    <div className="select_box">
                                        <input type="hidden" id=""/>
                                            <button type="button" className="select_btn">판매 완료</button>
                                            <ul className="select_layer">
                                                <li className="select_item"><button type="button">판매중</button></li>
                                                <li className="select_item active"><button type="button">판매 완료</button></li>
                                            </ul>
                                    </div>
                                </td>
                                <td>2024.04.01</td>
                                <td>
                                    <div className="select_box board_profile">
                                        <button type="button" className="profile_name"><span className="profile_img"><img src={require("../../images/profile_img1.jpg")} alt="프로필 이미지"/></span>나모모</button>

                                        <ul className="select_layer profile_list add_icon">
                                            <li className="profile_item graph"><button type="button">그래프 보기</button></li>
                                            <li className="profile_item secession"><button type="button">탈퇴 하기</button></li>
                                        </ul>
                                    </div>
                                </td>
                                <td className="ta_c">010-1234-5678</td>
                                <td className="ta_r">971213</td>
                                <td className="ta_r">S24U</td>
                                <td className="ta_r">320,000원</td>
                                <td className="ta_r">320,000원</td>
                                <td className="ta_r">다모모</td>
                                <td className="ta_c">
                                    <button type="button" className="btn_kakao">전송</button>
                                </td>
                            </tr>
                            <tr>
                                <td className="ta_c">
                                    <div className="check_box">
                                        <input type="checkbox" id="check2" checked/>
                                            <label htmlFor="check2">선택</label>
                                    </div>
                                </td>
                                <td>
                                    <div className="select_box">
                                        <input type="hidden" id=""/>
                                            <button type="button" className="select_btn">판매 완료</button>
                                            <ul className="select_layer">
                                                <li className="select_item"><button type="button">판매중</button></li>
                                                <li className="select_item active"><button type="button">판매 완료</button></li>
                                            </ul>
                                    </div>
                                </td>
                                <td>2024.04.01</td>
                                <td>
                                    <div className="select_box board_profile">
                                        <button type="button" className="profile_name"><span className="profile_img"><img src={require("../../images/profile_img1.jpg")} alt="프로필 이미지"/></span>나모모</button>
                                        <ul className="select_layer profile_list add_icon">
                                            <li className="profile_item graph"><button type="button">그래프 보기</button></li>
                                            <li className="profile_item secession"><button type="button">탈퇴 하기</button></li>
                                        </ul>
                                    </div>
                                </td>
                                <td className="ta_c">010-1234-5678</td>
                                <td className="ta_r">971213</td>
                                <td className="ta_r">S24U</td>
                                <td className="ta_r">320,000원</td>
                                <td className="ta_r">320,000원</td>
                                <td className="ta_r">다모모</td>
                                <td className="ta_c">
                                    <button type="button" className="btn_kakao">전송</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <div className="view_more">
                            <button type="button" className="view_more_btn">더 보기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}