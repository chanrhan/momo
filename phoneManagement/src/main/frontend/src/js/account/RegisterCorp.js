export function RegisterCorp(){
    return (
        <main>
            <div id="contents">
                <form className="user_box user_form">
                    <h2 className="user_title">사업자 등록하기</h2>

                    <ul className="form_list">
                        <li className="form_item">
                            <label htmlFor="buisnessman" className="form_label">사업자 등록</label>
                            <div className="form_inp">
                                <input type="text" id="buisnessman" className="inp" placeholder="상호를 입력해주세요."/>
                            </div>
                            <div className="form_inp">
                                <input type="text" title="인증번호" id="phoneCode" className="inp" placeholder="- 없이 숫자만 입력해주세요."/>
                                    <button type="button" className="form_btn">인증하기</button>
                            </div>
                            <p className="error_text">유효하지 않은 사업자 번호입니다.</p>
                        </li>
                    </ul>

                    <div className="form_btn_box">
                        <a href="#" className="btn btn_grey w30">이전</a>
                        <button type="submit" className="btn btn_blue w70">다음</button>
                    </div>
                </form>
            </div>
        </main>
    )
}