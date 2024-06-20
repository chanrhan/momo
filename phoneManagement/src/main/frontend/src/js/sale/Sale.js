import "../../css/board.module.css"

export function Sale(){
    return (
        <div id="contents">
            <div className="sub">
                <div className="sub_head">
                    <h2 className="sub_title">판매일보</h2>
                </div>

                <div className="board board_list">
                    <div className="board_head">
                        <form>
                            <div className="board_head_group">
                                <input type="text" className="inp date" placeholder="날짜 선택"/>
                                    <button type="button" className="btn_all">전체 보기</button>
                            </div>
                            <div className="board_head_group">
                                <div className="board_count">
                                    <span className="count_text">전체 <em>1,123</em>건</span>
                                    <span className="count_text"><em>3</em>건</span>
                                </div>

                                <button type="button" className="board_filter_btn">필터</button>

                                <div className="board_search">
                                    <input type="search" title="검색" id="board_search" placeholder="이름, 전화번호, 식별번호 검색"/>
                                        <button type="submit">검색</button>
                                </div>

                                <div className="board_btn_box">
                                    <button type="button" className="board_btn board_filter">필터</button>
                                </div>

                                <div className="board_btn_box">
                                    <button type="button" className="board_btn board_more">더보기</button>
                                </div>

                                <button type="button" className="btn btn_blue btn_medium">고객 추가</button>
                            </div>
                        </form>
                    </div>

                    <div className="board_body">
                        <table className="td_board">
                            <caption>판매일보 테이블 - 선택, 메인 구분, 개통날짜, 이름, 휴대폰 번호, 식별 번호, 모델명, 총 이익, 담당자, 예약 정보 제공</caption>
                            <colgroup>
                                <col style={{width: "42px"}}/>
                                    <col span="8"/>
                                        <col style={{width: "90px"}}/>
                            </colgroup>
                            <thead>
                            <tr>
                                <th scope="col" className="ta_c">
                                    <div className="check_box">
                                        <input type="checkbox" id="check_all"/>
                                            <label htmlFor="check_all">선택</label>
                                    </div>
                                </th>
                                <th scope="col">메인 구분</th>
                                <th scope="col" className="sort">개통날짜</th>
                                <th scope="col">이름</th>
                                <th scope="col">휴대폰 번호</th>
                                <th scope="col">식별 번호</th>
                                <th scope="col" className="sort">모델명</th>
                                <th scope="col" className="sort">총 이익</th>
                                <th scope="col" className="sort">담당자</th>
                                <th scope="col">예약</th>
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
                                    <span className="td_type blue">무선</span>
                                    <span className="td_type orange">유선</span>
                                    <span className="td_type pink">세컨</span>
                                </td>
                                <td>2024.04.01</td>
                                <td><span className="td_num">1</span> 나모모</td>
                                <td className="ta_c">010-1234-5678</td>
                                <td className="ta_r">971213</td>
                                <td className="ta_r">S24U</td>
                                <td className="ta_r">320,000원</td>
                                <td>
                                    <div className="select_box board_profile">
                                        <button type="button" className="profile_name"><span className="profile_img"><img src={require("../../images/profile_img1.jpg")} alt="프로필 이미지"/></span>나모모</button>
                                        <ul className="select_layer profile_list add_icon">
                                            <li className="profile_item graph"><button type="button">그래프 보기</button></li>
                                            <li className="profile_item secession"><button type="button">탈퇴 하기</button></li>
                                        </ul>
                                    </div>
                                </td>
                                <td className="ta_c">
                                    <button type="button" className="btn btn_grey btn_small btn_line">예약 확인</button>
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
                                    <span className="td_type purple">중고</span>
                                </td>
                                <td>2024.04.01</td>
                                <td><span className="td_num">1</span> 나모모</td>
                                <td className="ta_c">010-1234-5678</td>
                                <td className="ta_r">971213</td>
                                <td className="ta_r">S24U</td>
                                <td className="ta_r">320,000원</td>
                                <td>
                                    <div className="select_box board_profile">
                                        <button type="button" className="profile_name"><span className="profile_img"><img src={require("../../images/profile_img1.jpg")} alt="프로필 이미지"/></span>나모모</button>
                                        <ul className="select_layer profile_list add_icon">
                                            <li className="profile_item graph"><button type="button">그래프 보기</button></li>
                                            <li className="profile_item secession"><button type="button">탈퇴 하기</button></li>
                                        </ul>
                                    </div>
                                </td>
                                <td className="ta_c">
                                    <button type="button" className="btn btn_grey btn_small btn_line">예약 확인</button>
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