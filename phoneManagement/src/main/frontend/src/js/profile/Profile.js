import User from "../../css/user.module.css"
import logoImg from "../../images/user/logo.png"
import profileImg1 from "../../images/profile_img1.jpg"
import {cm} from "../utils/cm";
import {UserFormInput} from "../account/module/UserFormInput";
import {UserFormItem} from "../account/module/UserFormItem";

export function Profile(){
    return (
        <form className={cm(User.user_form, User.form_set)}>
            <div className={cm(User.user_logo)}><img src={logoImg} alt="momo"/></div>

            <h2 className={cm(User.user_title)}>내 정보 설정</h2>

            <div className={cm(User.user_profile)}>
                <div className={cm(User.profile_img)}>
                    <img className={cm(User.img)} src={profileImg1} alt="프로필 이미지"/>
                </div>

                <button type="button" className={cm(User.profile_upload)}>프로필 업로드</button>
            </div>

            <button type="button" className={`${User.profile_view} btn btn_blue btn_medium`}>내 명함 보기</button>

            <ul className={cm(User.form_list)}>
                <UserFormItem>
                    <UserFormInput subject='아이디' varName='id'/>
                </UserFormItem>
                <UserFormItem>
                    <UserFormInput subject='생년월일' varName='birth'/>
                </UserFormItem>
                <UserFormItem>
                    <UserFormInput subject='휴대폰번호' varName='tel'/>
                </UserFormItem>
                <UserFormItem>
                    <UserFormInput type='password' subject='비밀번호 변경' varName='pwd' bg readOnly>
                        <button type="button" className={cm(User.form_btn, User.btn_grey)}>재설정</button>
                    </UserFormInput>
                </UserFormItem>
            </ul>

            <div className={cm(User.form_btn_box)}>
                <button type="submit" className={`btn btn_blue ${User.btn}`}>저장</button>
            </div>

            <div className={cm(User.user_copyright)}>COPYRIGHT(C) MOMO, INC. ALL RIGHTS RESERVED.</div>

        </form>
    )
}