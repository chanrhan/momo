import "../../css/board.module.css"

export function Administrator(){
    return (
        <div id="contents">
            <div className="sub">
                <div className="sub_head">
                    <h2 className="sub_title">관리자 페이지</h2>
                </div>

                <div className="sub_tab">
                    <ul className="tab_list">
                        <li className="tab_item active"><a href="#" className="tab_btn">일반 회원</a></li>
                         {/*활성화시 active 추가 -->*/}
                        <li className="tab_item"><a href="#" className="tab_btn">정지회원</a></li>
                        <li className="tab_item"><a href="#" className="tab_btn">탈퇴회원</a></li>
                    </ul>
                </div>

                <div className="board board_list">
                    <div className="board_head">
                        <form>
                            <div className="board_head_group">
                                <input type="text" className="inp date entered" placeholder="날짜 선택" value="최근 30일"/>
                                 {/*입력시 entered 추가-->*/}
                                    <button type="button" className="btn_all">전체 보기</button>
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
                            <caption>회원관리 테이블 - 선택, No, 가입채널, 이름, 이메일, 휴대폰 번호, 사업자 등록, 가입일, 최근 로그인, 직급, 관리 정보 제공</caption>
                            <thead>
                            <tr>
                                <th scope="col" className="ta_c">
                                    <div className="check_box">
                                        <input type="checkbox" id="check_all"/>
                                            <label htmlFor="check_all">선택</label>
                                    </div>
                                </th>
                                <th scope="col">No</th>
                                <th scope="col">가입채널</th>
                                <th scope="col">이름</th>
                                <th scope="col" className="ta_c">이메일</th>
                                <th scope="col" className="ta_c">휴대폰 번호</th>
                                <th scope="col" className="ta_c">사업자 등록</th>
                                <th scope="col" className="ta_c">가입일</th>
                                <th scope="col" className="ta_c">최근 로그인</th>
                                <th scope="col" className="ta_c">직급</th>
                                <th scope="col" className="ta_c">관리</th>
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
                                <td>100</td>
                                <td>-</td>
                                <td>
                                    <div className="select_box board_profile">
                                        <button type="button" className="profile_name"><span className="profile_img"><img src={require("../../images/profile_img1.jpg")} alt="프로필 이미지"/></span>나모모</button>
                                        <ul className="select_layer profile_list add_icon">
                                            <li className="profile_item graph"><button type="button">그래프 보기</button></li>
                                            <li className="profile_item secession"><button type="button">탈퇴 하기</button></li>
                                        </ul>
                                    </div>
                                </td>
                                <td className="ta_c">momoadmin@momo.com</td>
                                <td className="ta_c">010-1234-5678</td>
                                <td className="ta_c">등록</td>
                                <td className="ta_c">2024-04-04</td>
                                <td className="ta_c">2024-04-04</td>
                                <td className="ta_c">대표</td>
                                <td className="ta_c">
                                    <a href="#" className="btn btn_grey btn_small btn_line">관리</a>
                                </td>
                            </tr>
                            <tr>
                                <td className="ta_c">
                                    <div className="check_box">
                                        <input type="checkbox" id="check2" checked/>
                                            <label htmlFor="check2">선택</label>
                                    </div>
                                </td>
                                <td>99</td>
                                <td>-</td>
                                <td>
                                    <div className="select_box board_profile">
                                        <button type="button" className="profile_name"><span className="profile_img"><img src={require("../../images/profile_img1.jpg")} alt="프로필 이미지"/></span>나모모</button>
                                        <ul className="select_layer profile_list add_icon">
                                            <li className="profile_item graph"><button type="button">그래프 보기</button></li>
                                            <li className="profile_item secession"><button type="button">탈퇴 하기</button></li>
                                        </ul>
                                    </div>
                                </td>
                                <td className="ta_c">momoadmin@momo.com</td>
                                <td className="ta_c">010-1234-5678</td>
                                <td className="ta_c">등록</td>
                                <td className="ta_c">2024-04-04</td>
                                <td className="ta_c">2024-04-04</td>
                                <td className="ta_c">대표</td>
                                <td className="ta_c">
                                    <a href="#" className="btn btn_grey btn_small btn_line">관리</a>
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