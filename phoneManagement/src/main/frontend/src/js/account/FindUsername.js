export function FindUsername(){
    return (
        <main>
            <div id="contents">
                <form className="user_box user_form user_find">
                    <h2 className="user_title">아이디 찾기</h2>

                    <ul className="form_list form_select">
                        <li className="form_item active">
                            {/*활성화시 active 추가*/}
                            <div className="radio_box">
                                <input type="radio" name="radio" id="radio" checked/>
                                    <label htmlFor="radio" className="form_label">휴대폰 번호로 찾기</label>
                            </div>
                            <div className="form_inp">
                                <input type="tel" title="휴대폰 번호" id="phoneNum" className="inp bg"/>
                            </div>
                            <div className="form_inp">
                                <input type="text" title="인증번호" id="phoneCode" className="inp"/>
                                    <button type="button" className="form_btn">인증하기</button>
                            </div>
                            <div className="form_timer">
                                <span className="timer_text">유효시간 <span className="timer_num">05:00</span></span>
                                <button type="button" className="timer_btn">재발송</button>
                            </div>
                        </li>
                        <li className="form_item">
                            <div className="radio_box">
                                <input type="radio" name="radio" id="radio2"/>
                                    <label htmlFor="radio2" className="form_label">이메일로 찾기</label>
                            </div>
                            <div className="form_inp">
                                <input type="email" title="이메일 주소" id="email" className="inp bg"/>
                            </div>
                            <div className="form_inp">
                                <input type="text" title="인증번호" id="emailCode" className="inp"/>
                                    <button type="button" className="form_btn">인증하기</button>
                            </div>
                            <div className="form_timer">
                                <span className="timer_text">유효시간 <span className="timer_num">05:00</span></span>
                                <button type="button" className="timer_btn">재발송</button>
                            </div>
                        </li>
                    </ul>

                    <div className="form_btn_box">
                        <button type="submit" className="btn btn_blue">다음</button>
                    </div>
                </form>
            </div>
        </main>
    )
}