import User from "../../css/user.module.css"
import {Link, useNavigate} from "react-router-dom";
import {UserFormItem} from "./module/UserFormItem";
import {UserTermList} from "./module/UserTermList";
import {UserFormInput} from "./module/UserFormInput";
import useValidateInputField from "../hook/useValidateInputField";
import {useEffect, useState} from "react";
import useApi from "../hook/useApi";
import {setRefreshToken} from "../utils/Cookies";
import {authActions} from "../store/slices/authSlice";
import {ObjectUtils} from "../utils/objectUtil";
import {cm} from "../utils/cm";
import {useDispatch} from "react-redux";
import {StringUtils} from "../utils/StringUtils";

export function Signup(){
    const {publicApi} = useApi();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inputField = useValidateInputField(SIGNUP_INPUTFIELD);
    let auth = null;

    const [termList, setTermList] = useState(new Array(2).fill(false));
    const [isSent, setIsSent] = useState(false)

    const toggleTerm = (index)=>{
        // console.log(`key: ${index}`)
        const copy = [...termList];
        copy[index] = !copy[index];
        setTermList(copy)
    }

    const sendAuthNumber = async ()=>{
        setIsSent(true)
        if(!inputField.error.tel && !ObjectUtils.isEmpty(inputField.input.tel)){
            // 휴대폰번호로 인증번호 보내는 로직

        }
    }

    const matchAuthNumber = ()=>{
        inputField.matchAuthNumber(auth);
    }


    const submit = async ()=>{
        if(inputField.validateAll()){
            await publicApi.signup({
                ...inputField.input,
                tel: StringUtils.toPhoneNumber(inputField.input.tel),
                terms: ObjectUtils.convertBooleanArrayToString(termList)
            }).then(({status, data, headers})=>{
                if(status === 200 && data){
                    console.table(headers)
                    dispatch(authActions.setAccessToken(headers.get('authorization')));
                    setRefreshToken(headers.get('refreshtoken'));
                    navigate('/shop/list')
                }
            })
        }
    }

    return (
        <main>
            <div>
                <form className={`${User.user_box} ${User.user_form}`}>
                    <h2 className={User.user_title}>회원가입</h2>

                    <ul className={User.form_list}>
                        <UserFormItem errorText={inputField.error.id}>
                            <UserFormInput subject='아이디' name='id' inputField={inputField}/>
                        </UserFormItem>
                        <UserFormItem errorText={inputField.error.pwd}>
                            <UserFormInput subject='비밀번호' name='pwd' inputField={inputField} onChange={inputField.handlePassword}/>
                        </UserFormItem>
                        <UserFormItem errorText={inputField.error.pwd2}>
                            <UserFormInput subject='비밀번호 확인' name='pwd2' inputField={inputField} onChange={inputField.handleConfirmPassword}/>
                        </UserFormItem>
                        <UserFormItem errorText={inputField.error.name}>
                            <UserFormInput subject='이름' name='name' inputField={inputField}/>
                        </UserFormItem>
                        <UserFormItem errorText={inputField.error.email}>
                            <UserFormInput subject='이메일' name='email' inputField={inputField}/>
                        </UserFormItem>
                        <UserFormItem errorText={inputField.error.tel}>
                            <UserFormInput subject='휴대폰 번호' name='tel' inputField={inputField}>
                                <button type="button" className={cm(User.form_btn, User.auth, `${isSent && User.resend}`)} onClick={sendAuthNumber}>{isSent ? '재발송': '인증번호 받기'}</button>
                            </UserFormInput>
                            <UserFormInput name='auth_code' inputField={inputField}>
                                <button type="button" className={User.form_btn} onClick={matchAuthNumber}>인증하기</button>
                            </UserFormInput>
                            {
                                isSent && <div className={User.form_timer}>
                                    <span className={User.timer_text}>유효시간 <span
                                        className={User.timer_num}>05:00</span></span>
                                    <button type="button" className={User.timer_btn}>재발송</button>
                                </div>
                            }

                        </UserFormItem>
                    </ul>

                    <div className={User.form_agree}>
                        <ul className={User.agree_list}>
                            <UserTermList subject='이용약관' index={0} value={termList[0]} onClick={toggleTerm}/>
                            <UserTermList subject='개인정보처리방침' index={1} value={termList[1]} onClick={toggleTerm}/>
                        </ul>
                    </div>

                    <div className={User.form_btn_box}>
                        <button type="button" className={`btn btn_blue ${User.btn}`} onClick={submit}>가입완료</button>
                    </div>

                    <div className={`${User.user_link} ${User.link_login}`}>이미 회원이신가요?<Link to='/account/login' className={User.a}>로그인</Link></div>
                </form>
            </div>
        </main>
    )
}

const SIGNUP_INPUTFIELD =


    [
    {
        key: 'id',
    },
    {
        key: 'pwd',
    },
    {
        key: 'pwd2',
    },
    {
        key: 'name',
    },
    {
        key: 'email',
    },{
        key: 'tel',
    },
    {
        key: 'auth_code'
    },
    {
        key: 'terms',
        value: []
    }
]