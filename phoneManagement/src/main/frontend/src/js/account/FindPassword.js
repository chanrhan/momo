import {Link} from "react-router-dom";
import User from "../../css/user.module.css"

export function FindPassword(){
    return (
        <main>
            <div id="contents">
                <form className="user_box user_form user_find">
                    <h2 className="user_title">비밀번호 찾기</h2>
                    <p className="form_text ta_c">회원님의 정보와 일치하는 아이디입니다.</p>

                    <ul className="form_list">
                        <li className="form_item">
                            <div className="form_inp">
                                <input type="text" title="아이디" id="id" className="inp bg" value="momo"/>
                            </div>
                            <p className="link_text">아이디가 기억나지 않는다면? <Link to='/account/find-username'>아이디 찾기</Link></p>
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