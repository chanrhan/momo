import "../../css/board.module.css"


export function ManageStaff(){
    return (
        <div id="contents">
            <div className="sub">
                <div className="sub_head">
                    <h2 className="sub_title">직원 현황</h2>
                    <button type="button" className="btn btn_blue btn_medium sub_head_btn">저장하기</button>
                </div>

                <div className="board board_list">
                    <div className="board_head">
                        <form>
                            <div className="board_head_group">
                                <div className="board_count">
                                    <span className="count_text">전체 <em>1,123</em>건</span>
                                    <span className="count_text"><em>3</em>건</span>
                                </div>
                            </div>

                            <div className="board_head_group">
                                <div className="board_search">
                                    <input type="search" title="검색" id="board_search" placeholder="이름, 전화번호, 식별번호 검색"/>
                                        <button type="submit">검색</button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="board_body">
                        <table className="td_board">
                            <caption>직원 현황 테이블 - 선택, 이름, 소속매장, 권한, 승인요청 정보 제공</caption>
                            <colgroup>
                                <col style={{width: "42px"}}/>
                                <col/>
                                        <col/>
                                            <col/>
                                                <col style={{width: "150px"}}/>
                            </colgroup>
                            <thead>
                            <tr>
                                <th scope="col" className="ta_c">
                                    <div className="check_box">
                                        <input type="checkbox" id="check_all"/>
                                            <label htmlFor="check_all">선택</label>
                                    </div>
                                </th>
                                <th scope="col">이름</th>
                                <th scope="col">소속매장</th>
                                <th scope="col">권한</th>
                                <th scope="col">승인요청</th>
                            </tr>
                            </thead>
                            <tbody className="br_none">
                            <tr>
                                <td className="ta_c">
                                    <div className="check_box">
                                        <input type="checkbox" id="check" checked/>
                                            <label htmlFor="check">선택</label>
                                    </div>
                                </td>
                                <td>
                                    <div className="select_box board_profile">
                                        <button type="button" className="profile_name"><span className="profile_img"><img src={require("../../images/profile_img1.jpg")} alt="프로필 이미지"/></span>나모모</button>
                                        <ul className="select_layer profile_list add_icon active">
                                             {/*활성화시 active 추가 -->*/}
                                            <li className="select_item select_icon graph"><button type="button">그래프 보기</button></li>
                                            <li className="select_item select_icon secession"><button type="button">탈퇴 하기</button></li>
                                        </ul>
                                    </div>
                                </td>
                                <td>
                                    <div className="select_box">
                                        <input type="hidden" id=""/>
                                            <button type="button" className="select_btn">울타리 일번가점</button>
                                            <ul className="select_layer">
                                                <li className="select_item"><button type="button">울타리 평촌역점</button></li>
                                                <li className="select_item active"><button type="button">울타리 일번가점</button></li>
                                                <li className="select_item"><button type="button">울타리 관양점</button></li>
                                            </ul>
                                    </div>
                                </td>
                                <td>
                                    <div className="select_box">
                                        <input type="hidden" id=""/>
                                            <button type="button" className="select_btn">점장</button>
                                            <ul className="select_layer">
                                                <li className="select_item"><button type="button">팀원</button></li>
                                                <li className="select_item active"><button type="button">점장</button></li>
                                                <li className="select_item"><button type="button">대표</button></li>
                                            </ul>
                                    </div>
                                </td>
                                <td className="ta_c">
                                    <button type="button" className="btn btn_grey btn_small btn_line">승인</button>
                                    <button type="button" className="btn btn_grey btn_small btn_line">거절</button>
                                </td>
                            </tr>
                            <tr>
                                <td className="ta_c">
                                    <div className="check_box">
                                        <input type="checkbox" id="check2"/>
                                            <label htmlFor="check2">선택</label>
                                    </div>
                                </td>
                                <td>
                                    <div className="select_box board_profile">
                                        <button type="button" className="profile_name"><span className="profile_img"><img src={require("../../images/profile_img1.jpg")} alt="프로필 이미지"/></span>나모모</button>
                                        <ul className="select_layer profile_list add_icon">
                                            <li className="profile_item graph"><button type="button">그래프 보기</button></li>
                                            <li className="profile_item secession"><button type="button">탈퇴 하기</button></li>
                                        </ul>
                                    </div>
                                </td>
                                <td>
                                    <div className="select_box">
                                        <input type="hidden" id=""/>
                                            <button type="button" className="select_btn">울타리 일번가점</button>
                                            <ul className="select_layer">
                                                <li className="select_item"><button type="button">울타리 평촌역점</button></li>
                                                <li className="select_item active"><button type="button">울타리 일번가점</button></li>
                                                <li className="select_item"><button type="button">울타리 관양점</button></li>
                                            </ul>
                                    </div>
                                </td>
                                <td>
                                    <div className="select_box">
                                        <input type="hidden" id=""/>
                                            <button type="button" className="select_btn">점장</button>
                                            <ul className="select_layer">
                                                <li className="select_item"><button type="button">팀원</button></li>
                                                <li className="select_item active"><button type="button">점장</button></li>
                                                <li className="select_item"><button type="button">대표</button></li>
                                            </ul>
                                    </div>
                                </td>
                                <td className="ta_c">
                                    <button type="button" className="btn btn_blue btn_small btn_line">승인 완료</button>
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