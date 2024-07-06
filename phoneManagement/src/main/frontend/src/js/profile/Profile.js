import User from "../../css/user.module.css"
import logoImg from "../../images/user/logo.png"
import profileImg1 from "../../images/profile_img1.jpg"
import {cm} from "../utils/cm";
import {UserFormInput} from "../account/module/UserFormInput";
import {UserFormItem} from "../account/module/UserFormItem";
import useInputField from "../hook/useInputField";
import useApi from "../hook/useApi";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

export function Profile(){
    const {userApi} = useApi();
    const user = useSelector(state=>state.userReducer)
    const inputField = useInputField();

    useEffect(() => {
        inputField.setInput({
            name: user.name,
            tel: user.tel
        })
    }, [user]);

    const submit = async ()=>{
        // 프로필 이미지도 같이 보내야 할까?
        // 변동사항이 있을 때만 같이 보내는 걸로 해야할듯
        // 추후 프론트, 백엔드 모두 수정
        await userApi.updateUserInfo({
            ...inputField.input,
            id: user.id,
        }).then(({status,data})=>{
            if(status === 200){
                alert(`data: ${data}`)
            }
        })
    }

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
                    <UserFormInput inputField={inputField} subject='이름' name='name'/>
                </UserFormItem>
                <UserFormItem>
                    <UserFormInput inputField={inputField} subject='생년월일' name='birth'/>
                </UserFormItem>
                <UserFormItem>
                    <UserFormInput inputField={inputField} subject='휴대폰번호' name='tel'/>
                </UserFormItem>
                <UserFormItem>
                    <UserFormInput inputField={inputField} type='password' subject='비밀번호 변경' name='pwd' bg readOnly>
                        <button type="button" className={cm(User.form_btn, User.btn_grey)}>재설정</button>
                    </UserFormInput>
                </UserFormItem>
            </ul>

            <div className={cm(User.form_btn_box)}>
                <button type="button" className={`btn btn_blue ${User.btn}`} onClick={submit}>저장</button>
            </div>

            <div className={cm(User.user_copyright)}>COPYRIGHT(C) MOMO, INC. ALL RIGHTS RESERVED.</div>

        </form>
    )
}