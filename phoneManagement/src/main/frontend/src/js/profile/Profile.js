import "../../css/user.module.css"

export function Profile(){
    return (
        <div id="contents">
            <form className="user_form form_set">
                <div className="user_logo"><img src={require("../../images/user/logo.png")} alt="momo"/></div>

                <h2 className="user_title">내 정보 설정</h2>

                <div className="user_profile">
                    <div className="profile_img">
                        <img src={require("../../images/profile_img1.jpg")} alt="프로필 이미지"/>
                    </div>

                    <button type="button" className="profile_upload">프로필 업로드</button>
                </div>

                <button type="button" className="profile_view btn btn_blue btn_medium">내 명함 보기</button>

                <ul className="form_list">
                    <li className="form_item">
                        <label htmlFor="id" className="form_label">아이디</label>
                        <div className="form_inp">
                            <input type="text" id="id" className="inp" value="kimmomo" readOnly/>
                        </div>
                    </li>
                    <li className="form_item">
                        <label htmlFor="name" className="form_label">비밀번호</label>
                        <div className="form_inp">
                            <input type="text" id="name" className="inp" value="김모모"/>
                        </div>
                    </li>
                    <li className="form_item">
                        <label htmlFor="birth" className="form_label">생년월일</label>
                        <div className="form_inp">
                            <input type="password" id="birth" className="inp" value="2020.01.01"/>
                        </div>
                    </li>
                    <li className="form_item">
                        <label htmlFor="phoneNum" className="form_label">휴대폰 번호</label>
                        <div className="form_inp">
                            <input type="tel" id="phoneNum" className="inp" value="010-1234-5678"/>
                        </div>
                    </li>
                    <li className="form_item">
                        <label htmlFor="phoneCode" className="form_label">비밀번호</label>
                        <div className="form_inp">
                            <input type="password" id="phoneCode" className="inp bg"/>
                                {/*<input type="password" title="비밀번호" id="phoneCode" className="inp" readonly> 입력 불가시-->*/}
                                <button type="button" className="form_btn btn_grey">재설정</button>
                        </div>
                    </li>
                </ul>

                <div className="form_btn_box">
                    <button type="submit" className="btn btn_blue">저장</button>
                </div>

                <div className="user_copyright">COPYRIGHT(C) MOMO, INC. ALL RIGHTS RESERVED.</div>

            </form>
        </div>
    )
}