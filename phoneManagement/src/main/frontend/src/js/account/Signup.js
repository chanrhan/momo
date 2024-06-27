import User from "../../css/user.module.css"
import {Link} from "react-router-dom";
import {UserFormItem} from "./module/UserFormItem";
import {UserAuthInputList} from "./module/UserAuthInputList";
import {UserAgreeCheckboxList} from "./module/UserAgreeCheckboxList";

export function Signup(){
    return (
        <main>
            <div>
                <form className={`${User.user_box} ${User.user_form}`}>
                    <h2 className={User.user_title}>회원가입</h2>

                    <ul className={User.form_list}>
                        <UserFormItem subject='아이디' varName='id' error={false} errorText='아이디를 입력해주세요.'/>
                        <UserFormItem subject='비밀번호' varName='pwd' error={false} errorText='숫자, 영문, 특수문자 조합 8글자 이상 입력해주세요.'/>
                        <UserFormItem subject='비밀번호 확인' varName='confirmed_pwd' error={false} errorText='비밀번호와 비밀번호 확인이 일치하지 않습니다.'/>
                        <UserFormItem subject='이름' varName='name' error={false} errorText='이름을 입력해주세요.'/>
                        <UserFormItem subject='이메일' varName='email' error={false} errorText='이메일을 입력해주세요.'/>
                        <UserAuthInputList subject='휴대폰 번호' varName='tel' errorText='인증번호를 입력해주세요.'/>
                    </ul>

                    <div className={User.form_agree}>
                        <ul className={User.agree_list}>
                            <UserAgreeCheckboxList subject='이용약관' varName='agree1'/>
                            <UserAgreeCheckboxList subject='개인정보처리방침' varName='agree2'/>
                        </ul>
                    </div>

                    <div className={User.form_btn_box}>
                        <button type="submit" className={`btn btn_blue ${User.btn}`}>가입완료</button>
                    </div>

                    <div className={`${User.user_link} ${User.link_login}`}>이미 회원이신가요?<Link to='/account/login' className={User.a}>로그인</Link></div>
                </form>
            </div>
        </main>
    )
}