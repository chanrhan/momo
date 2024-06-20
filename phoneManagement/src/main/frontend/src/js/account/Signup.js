import "../../css/user.module.css"
import {Link} from "react-router-dom";

export function Signup(){
    return (
        <main>
            <div id="contents">
                <form className="user_box user_form">
                    <h2 className="user_title">회원가입</h2>

                    <ul className="form_list">
                        <li className="form_item">
                            <label htmlFor="id" className="form_label">아이디</label>
                            <div className="form_inp">
                                <input type="text" id="id" className="inp" value="kimmomo"/>
                            </div>
                            <p className="error_text">아아디를 입력해주세요.</p>
                        </li>
                        <li className="form_item">
                            <label htmlFor="pw" className="form_label">비밀번호</label>
                            <div className="form_inp">
                                <input type="password" id="pw" className="inp"/>
                            </div>
                            <p className="error_text">숫자, 영문, 특수문자 조합 8글자 이상 입력해주세요.</p>
                        </li>
                        <li className="form_item">
                            <label htmlFor="pw2" className="form_label">비밀번호 확인</label>
                            <div className="form_inp">
                                <input type="password" id="pw2" className="inp"/>
                            </div>
                            <p className="error_text">비밀번호와 비밀번호 확인이 일치하지 않습니다.</p>
                        </li>
                        <li className="form_item">
                            <label htmlFor="name" className="form_label">이름</label>
                            <div className="form_inp">
                                <input type="text" id="name" className="inp"/>
                            </div>
                            <p className="error_text">이름을 입력해주세요.</p>
                        </li>
                        <li className="form_item">
                            <label htmlFor="email" className="form_label">이메일</label>
                            <div className="form_inp">
                                <input type="email" id="email" className="inp"/>
                            </div>
                            <p className="error_text">이메일을 입력해주세요.</p>
                        </li>
                        <li className="form_item">
                            <label htmlFor="phoneNum" className="form_label">휴대폰 번호</label>
                            <div className="form_inp">
                                <input type="tel" id="phoneNum" className="inp bg"/>
                                {/*<input type="tel" id="phoneNum" className="inp" readonly>*/}
                            </div>
                            <div className="form_inp">
                                <input type="text" title="인증번호" id="phoneCode" className="inp"/>
                                    <button type="button" className="form_btn">인증하기</button>
                            </div>
                            <div className="form_timer">
                                <span className="timer_text">유효시간 <span className="timer_num">05:00</span></span>
                                <button type="button" className="timer_btn">재발송</button>
                            </div>
                            <p className="error_text">인증번호를 입력해주세요.</p>
                        </li>
                    </ul>

                    <div className="form_agree">
                        <ul className="agree_list">
                            <li className="agree_item">
                                <input type="checkbox" id="agree" checked/>
                                    <label htmlFor="agree">[필수] 이용약관</label>
                            </li>
                            <li className="agree_item">
                                <input type="checkbox" id="agree2"/>
                                    <label htmlFor="agree2">[필수] 개인정보처리방침</label>
                            </li>
                        </ul>
                    </div>

                    <div className="form_btn_box">
                        <button type="submit" className="btn btn_blue">가입완료</button>
                    </div>

                    <div className="user_link link_login">이미 회원이신가요?<Link to='/account/login'>로그인</Link></div>
                </form>
            </div>
        </main>
    )
}