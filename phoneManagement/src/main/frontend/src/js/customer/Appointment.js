export function Appointment(){
    return (
        <div id="contents">
            <div className="sub">
                <div className="sub_head">
                    <h2 className="sub_title">고객관리</h2>
                </div>

                <div className="sub_tab">
                    <ul className="tab_list">
                        <li className="tab_item"><a href="#" className="tab_btn">중고폰</a></li>\
                         {/*활성화시 active 추가 -->*/}
                        <li className="tab_item"><a href="#" className="tab_btn">카드</a></li>
                        <li className="tab_item"><a href="#" className="tab_btn">결합</a></li>
                        <li className="tab_item"><a href="#" className="tab_btn">지원</a></li>
                        <li className="tab_item active"><a href="#" className="tab_btn">고객약속</a></li>
                    </ul>

                    <a href="#" className="btn btn_blue btn_medium btn_add">약속 추가</a>
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
                        <div className="promise">
                            <form>
                                <ul className="promise_list">
                                    <li className="promise_item">
                                        <div className="promise_box">
                                            <div className="promise_profile">
                                                <div className="profile_img"><img src={require("../../images/profile_img1.jpg")} alt="프로필 이미지"/></div>
                                                <div className="profile_text">
                                                    <div className="profile_name">김모모<span>20.01.01</span></div>
                                                    <ul className="profile_info">
                                                        <li><span>개통일</span>2024.04.01</li>
                                                        <li><span>연락처</span>010-1234-5678</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="promise_option">
                                                <div className="option_scroll">
                                                    <ul className="option_list">
                                                        <li className="option_item">
                                                            <div className="radio_box">
                                                                <input type="radio" name="radio" id="radio_1" disabled/>
                                                                    <label htmlFor="radio_1" className="form_label">S24U 디바이스 케이스</label>
                                                            </div>
                                                        </li>
                                                        <li className="option_item">
                                                            <div className="radio_box">
                                                                <input type="radio" name="radio" id="radio_2" checked/>
                                                                    <label htmlFor="radio_2" className="form_label">S24U 디바이스 케이스</label>
                                                            </div>
                                                        </li>
                                                        <li className="option_item">
                                                            <div className="radio_box">
                                                                <input type="radio" name="radio" id="radio_3"/>
                                                                    <label htmlFor="radio_3" className="form_label">S24U 디바이스 케이스</label>
                                                            </div>

                                                            <li className="option_item">
                                                                <div className="radio_box">
                                                                    <input type="radio" name="radio" id="radio_4"/>
                                                                        <label htmlFor="radio_4" className="form_label">S24U 디바이스 케이스</label>
                                                                </div>
                                                            </li>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="option_add">
                                                    <button type="button" className="add_btn">추가</button>
                                                    <input type="text" className="inp" placeholder="단계 추가"/>
                                                </div>
                                            </div>
                                            <button type="button" className="btn btn_blue btn_medium btn_promise">완료</button>
                                        </div>
                                    </li>

                                    <li className="promise_item">
                                        <div className="promise_box">
                                            <div className="promise_profile">
                                                <div className="profile_img"><img src={require("../../images/profile_img1.jpg")} alt="프로필 이미지"/></div>
                                                <div className="profile_text">
                                                    <div className="profile_name">김모모<span>20.01.01</span></div>
                                                    <ul className="profile_info">
                                                        <li><span>개통일</span>2024.04.01</li>
                                                        <li><span>연락처</span>010-1234-5678</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="promise_option">
                                                <div className="option_scroll">
                                                    <ul className="option_list">
                                                        <li className="option_item">
                                                            <div className="radio_box">
                                                                <input type="radio" name="radio2" id="radio2_1" disabled/>
                                                                    <label htmlFor="radio2_1" className="form_label">S24U 디바이스 케이스</label>
                                                            </div>
                                                        </li>
                                                        <li className="option_item">
                                                            <div className="radio_box">
                                                                <input type="radio" name="radio2" id="radio2_2" checked/>
                                                                    <label htmlFor="radio2_2" className="form_label">S24U 디바이스 케이스</label>
                                                            </div>
                                                        </li>
                                                        <li className="option_item">
                                                            <div className="radio_box">
                                                                <input type="radio" name="radio2" id="radio2_3"/>
                                                                    <label htmlFor="radio2_3" className="form_label">S24U 디바이스 케이스</label>
                                                            </div>

                                                            <li className="option_item">
                                                                <div className="radio_box">
                                                                    <input type="radio" name="radio2" id="radio2_4"/>
                                                                        <label htmlFor="radio2_4" className="form_label">S24U 디바이스 케이스</label>
                                                                </div>
                                                            </li>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="option_add">
                                                    <button type="button" className="add_btn">추가</button>
                                                    <input type="text" className="inp" placeholder="단계 추가"/>
                                                </div>
                                            </div>
                                            <button type="button" className="btn btn_blue btn_medium btn_promise">완료</button>
                                        </div>
                                    </li>

                                    <li className="promise_item">
                                        <div className="promise_box">
                                            <div className="promise_profile">
                                                <div className="profile_img"><img src={require("../../images/profile_img1.jpg")} alt="프로필 이미지"/></div>
                                                <div className="profile_text">
                                                    <div className="profile_name">김모모<span>20.01.01</span></div>
                                                    <ul className="profile_info">
                                                        <li><span>개통일</span>2024.04.01</li>
                                                        <li><span>연락처</span>010-1234-5678</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="promise_option">
                                                <div className="option_scroll">
                                                    <ul className="option_list">
                                                        <li className="option_item">
                                                            <div className="radio_box">
                                                                <input type="radio" name="radio3" id="radio3_1" disabled/>
                                                                    <label htmlFor="radio3_1" className="form_label">S24U 디바이스 케이스</label>
                                                            </div>
                                                        </li>
                                                        <li className="option_item">
                                                            <div className="radio_box">
                                                                <input type="radio" name="radio3" id="radio3_2" checked/>
                                                                    <label htmlFor="radio3_2" className="form_label">S24U 디바이스 케이스</label>
                                                            </div>
                                                        </li>
                                                        <li className="option_item">
                                                            <div className="radio_box">
                                                                <input type="radio" name="radio3" id="radio3_3"/>
                                                                    <label htmlFor="radio3_3" className="form_label">S24U 디바이스 케이스</label>
                                                            </div>

                                                            <li className="option_item">
                                                                <div className="radio_box">
                                                                    <input type="radio" name="radio3" id="radio3_4"/>
                                                                        <label htmlFor="radio3_4" className="form_label">S24U 디바이스 케이스</label>
                                                                </div>
                                                            </li>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="option_add">
                                                    <button type="button" className="add_btn">추가</button>
                                                    <input type="text" className="inp" placeholder="단계 추가"/>
                                                </div>
                                            </div>
                                            <button type="button" className="btn btn_blue btn_medium btn_promise">완료</button>
                                        </div>
                                    </li>

                                    <li className="promise_item">
                                        <div className="promise_box">
                                            <div className="promise_profile">
                                                <div className="profile_img"><img src={require("../../images/profile_img1.jpg")} alt="프로필 이미지"/></div>
                                                <div className="profile_text">
                                                    <div className="profile_name">김모모<span>20.01.01</span></div>
                                                    <ul className="profile_info">
                                                        <li><span>개통일</span>2024.04.01</li>
                                                        <li><span>연락처</span>010-1234-5678</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="promise_option">
                                                <div className="option_scroll">
                                                    <ul className="option_list">
                                                        <li className="option_item">
                                                            <div className="radio_box">
                                                                <input type="radio" name="radio4" id="radio_1" disabled/>
                                                                    <label htmlFor="radio_1" className="form_label">S24U 디바이스 케이스</label>
                                                            </div>
                                                        </li>
                                                        <li className="option_item">
                                                            <div className="radio_box">
                                                                <input type="radio" name="radio4" id="radio_2" checked/>
                                                                    <label htmlFor="radio_2" className="form_label">S24U 디바이스 케이스</label>
                                                            </div>
                                                        </li>
                                                        <li className="option_item">
                                                            <div className="radio_box">
                                                                <input type="radio" name="radio4" id="radio_3"/>
                                                                    <label htmlFor="radio_3" className="form_label">S24U 디바이스 케이스</label>
                                                            </div>

                                                            <li className="option_item">
                                                                <div className="radio_box">
                                                                    <input type="radio" name="radio4" id="radio_4"/>
                                                                        <label htmlFor="radio_4" className="form_label">S24U 디바이스 케이스</label>
                                                                </div>
                                                            </li>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="option_add">
                                                    <button type="button" className="add_btn">추가</button>
                                                    <input type="text" className="inp" placeholder="단계 추가"/>
                                                </div>
                                            </div>
                                            <button type="button" className="btn btn_blue btn_medium btn_promise">완료</button>
                                        </div>
                                    </li>

                                    <li className="promise_item">
                                        <div className="promise_box">
                                            <div className="promise_profile">
                                                <div className="profile_img"><img src={require("../../images/profile_img1.jpg")} alt="프로필 이미지"/></div>
                                                <div className="profile_text">
                                                    <div className="profile_name">김모모<span>20.01.01</span></div>
                                                    <ul className="profile_info">
                                                        <li><span>개통일</span>2024.04.01</li>
                                                        <li><span>연락처</span>010-1234-5678</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="promise_option">
                                                <div className="option_scroll">
                                                    <ul className="option_list">
                                                        <li className="option_item">
                                                            <div className="radio_box">
                                                                <input type="radio" name="radio5" id="radio_1" disabled/>
                                                                    <label htmlFor="radio_1" className="form_label">S24U 디바이스 케이스</label>
                                                            </div>
                                                        </li>
                                                        <li className="option_item">
                                                            <div className="radio_box">
                                                                <input type="radio" name="radio5" id="radio_2" checked/>
                                                                    <label htmlFor="radio_2" className="form_label">S24U 디바이스 케이스</label>
                                                            </div>
                                                        </li>
                                                        <li className="option_item">
                                                            <div className="radio_box">
                                                                <input type="radio" name="radio5" id="radio_3"/>
                                                                    <label htmlFor="radio_3" className="form_label">S24U 디바이스 케이스</label>
                                                            </div>

                                                            <li className="option_item">
                                                                <div className="radio_box">
                                                                    <input type="radio" name="radio5" id="radio_4"/>
                                                                        <label htmlFor="radio_4" className="form_label">S24U 디바이스 케이스</label>
                                                                </div>
                                                            </li>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="option_add">
                                                    <button type="button" className="add_btn">추가</button>
                                                    <input type="text" className="inp" placeholder="단계 추가"/>
                                                </div>
                                            </div>
                                            <button type="button" className="btn btn_blue btn_medium btn_promise">완료</button>
                                        </div>
                                    </li>

                                    <li className="promise_item">
                                        <div className="promise_box">
                                            <div className="promise_profile">
                                                <div className="profile_img"><img src={require("../../images/profile_img1.jpg")} alt="프로필 이미지"/></div>
                                                <div className="profile_text">
                                                    <div className="profile_name">김모모<span>20.01.01</span></div>
                                                    <ul className="profile_info">
                                                        <li><span>개통일</span>2024.04.01</li>
                                                        <li><span>연락처</span>010-1234-5678</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="promise_option">
                                                <div className="option_scroll">
                                                    <ul className="option_list">
                                                        <li className="option_item">
                                                            <div className="radio_box">
                                                                <input type="radio" name="radio6" id="radio_1" disabled/>
                                                                    <label htmlFor="radio_1" className="form_label">S24U 디바이스 케이스</label>
                                                            </div>
                                                        </li>
                                                        <li className="option_item">
                                                            <div className="radio_box">
                                                                <input type="radio" name="radio6" id="radio_2" checked/>
                                                                    <label htmlFor="radio_2" className="form_label">S24U 디바이스 케이스</label>
                                                            </div>
                                                        </li>
                                                        <li className="option_item">
                                                            <div className="radio_box">
                                                                <input type="radio" name="radio6" id="radio_3"/>
                                                                    <label htmlFor="radio_3" className="form_label">S24U 디바이스 케이스</label>
                                                            </div>

                                                            <li className="option_item">
                                                                <div className="radio_box">
                                                                    <input type="radio" name="radio6" id="radio_4"/>
                                                                        <label htmlFor="radio_4" className="form_label">S24U 디바이스 케이스</label>
                                                                </div>
                                                            </li>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="option_add">
                                                    <button type="button" className="add_btn">추가</button>
                                                    <input type="text" className="inp" placeholder="단계 추가"/>
                                                </div>
                                            </div>
                                            <button type="button" className="btn btn_blue btn_medium btn_promise">완료</button>
                                        </div>
                                    </li>

                                    <li className="promise_item">
                                        <div className="promise_box">
                                            <div className="promise_profile">
                                                <div className="profile_img"><img src={require("../../images/profile_img1.jpg")} alt="프로필 이미지"/></div>
                                                <div className="profile_text">
                                                    <div className="profile_name">김모모<span>20.01.01</span></div>
                                                    <ul className="profile_info">
                                                        <li><span>개통일</span>2024.04.01</li>
                                                        <li><span>연락처</span>010-1234-5678</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="promise_option">
                                                <div className="option_scroll">
                                                    <ul className="option_list">
                                                        <li className="option_item">
                                                            <div className="radio_box">
                                                                <input type="radio" name="radio7" id="radio_1" disabled/>
                                                                    <label htmlFor="radio_1" className="form_label">S24U 디바이스 케이스</label>
                                                            </div>
                                                        </li>
                                                        <li className="option_item">
                                                            <div className="radio_box">
                                                                <input type="radio" name="radio7" id="radio_2" checked/>
                                                                    <label htmlFor="radio_2" className="form_label">S24U 디바이스 케이스</label>
                                                            </div>
                                                        </li>
                                                        <li className="option_item">
                                                            <div className="radio_box">
                                                                <input type="radio" name="radio7" id="radio_3"/>
                                                                    <label htmlFor="radio_3" className="form_label">S24U 디바이스 케이스</label>
                                                            </div>

                                                            <li className="option_item">
                                                                <div className="radio_box">
                                                                    <input type="radio" name="radio7" id="radio_4"/>
                                                                        <label htmlFor="radio_4" className="form_label">S24U 디바이스 케이스</label>
                                                                </div>
                                                            </li>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="option_add">
                                                    <button type="button" className="add_btn">추가</button>
                                                    <input type="text" className="inp" placeholder="단계 추가"/>
                                                </div>
                                            </div>
                                            <button type="button" className="btn btn_blue btn_medium btn_promise">완료</button>
                                        </div>
                                    </li>

                                    <li className="promise_item">
                                        <div className="promise_box">
                                            <div className="promise_profile">
                                                <div className="profile_img"><img src={require("../../images/profile_img1.jpg")} alt="프로필 이미지"/></div>
                                                <div className="profile_text">
                                                    <div className="profile_name">김모모<span>20.01.01</span></div>
                                                    <ul className="profile_info">
                                                        <li><span>개통일</span>2024.04.01</li>
                                                        <li><span>연락처</span>010-1234-5678</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="promise_option">
                                                <div className="option_scroll">
                                                    <ul className="option_list">
                                                        <li className="option_item">
                                                            <div className="radio_box">
                                                                <input type="radio" name="radio8" id="radio_1" disabled/>
                                                                    <label htmlFor="radio_1" className="form_label">S24U 디바이스 케이스</label>
                                                            </div>
                                                        </li>
                                                        <li className="option_item">
                                                            <div className="radio_box">
                                                                <input type="radio" name="radio8" id="radio_2" checked/>
                                                                    <label htmlFor="radio_2" className="form_label">S24U 디바이스 케이스</label>
                                                            </div>
                                                        </li>
                                                        <li className="option_item">
                                                            <div className="radio_box">
                                                                <input type="radio" name="radio8" id="radio_3"/>
                                                                    <label htmlFor="radio_3" className="form_label">S24U 디바이스 케이스</label>
                                                            </div>

                                                            <li className="option_item">
                                                                <div className="radio_box">
                                                                    <input type="radio" name="radio8" id="radio_4"/>
                                                                        <label htmlFor="radio_4" className="form_label">S24U 디바이스 케이스</label>
                                                                </div>
                                                            </li>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="option_add">
                                                    <button type="button" className="add_btn">추가</button>
                                                    <input type="text" className="inp" placeholder="단계 추가"/>
                                                </div>
                                            </div>
                                            <button type="button" className="btn btn_blue btn_medium btn_promise">완료</button>
                                        </div>
                                    </li>
                                </ul>
                            </form>
                        </div>

                        <div className="view_more">
                            <button type="button" className="view_more_btn">더 보기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}