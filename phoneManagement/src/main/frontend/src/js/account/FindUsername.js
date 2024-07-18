import User from "../../css/user.module.css"
import {UserFormFindBox} from "./module/UserFormFindBox";
import {UserFormBox} from "./module/UserFormBox";
import {UserFormBtnBox} from "./module/UserFormBtnBox";
import {useState} from "react";
import {cm, cmc} from "../utils/cm";
import {UserFormItem} from "./module/UserFormItem";
import {UserFormInput} from "./module/UserFormInput";
import useValidateInputField from "../hook/useValidateInputField";
import {ObjectUtils} from "../utils/objectUtil";
import useApi from "../hook/useApi";
import {Link} from "react-router-dom";
import useModal from "../hook/useModal";
import {ModalType} from "../common/modal/ModalType";

export function FindUsername(){
    const {publicApi} = useApi();
    const modal = useModal();

    const inputField = useValidateInputField([{key:'tel'},{key:'email'}]);
    const [byTel, setByTel] = useState(true)
    const [isSent, setIsSent] = useState(false)
    const [auth, setAuth] = useState(null)
    const [foundUsers, setFoundUsers] = useState(null)

    const toggleRadio = ()=>{
        let field = inputField.input[(byTel ? 'tel': 'email')];
        // console.log(`field: ${field}`)
        if(ObjectUtils.isEmpty(field)){
           inputField.clearErrorOf(byTel ? 'tel': 'email')
        }
        inputField.clearOf('auth_code');
        inputField.clearOf(byTel ? 'tel':'email')
        setByTel(!byTel)
        setIsSent(false)
    }

    const sendAuthNumber = ()=>{
        if(inputField.validateOne('tel')){
            setAuth("123")

            modal.openModal(ModalType.SNACKBAR.Info, {
                msg: '인증번호가 전송되었습니다'
            })
        }
    }

    const matchAuthNumber = ()=>{
        inputField.matchAuthNumber(auth)
    }

    const prev = ()=>{
        setFoundUsers(null)
    }

    const submit = async()=>{
        const by = byTel ? 'tel':'email';
        if(inputField.matchAuthNumber(auth) && inputField.validateOne(by)){
            await publicApi.findUser(by, inputField.input[by]).then(({status,data})=>{
                if(status === 200){
                    setFoundUsers(data)
                }
            })
        }
    }

    if(foundUsers){
        return (
            <UserFormBox title='아이디 찾기' find>
                <p className={`ta_c ${User.form_text}`}>회원님의 정보와 일치하는 아이디입니다.</p>

                <ul className={cm(User.form_list,User.form_confirm)}>
                    {
                        foundUsers.map((v,i)=> {
                            return <li className={cm(User.form_item)}>
                                <div className={cmc(User.radio_box)}>
                                    <input type="radio" name="radio" className={cm(User.input)}/>
                                    <label htmlFor="radio" className={User.form_label}><span
                                        className={User.span}>{v.id}</span>(가입일 : {v.regi_dt})</label>
                                </div>
                            </li>
                        })
                    }
                </ul>

                <div className={User.form_btn_box}>
                    <Link to='/account/login' className={`btn_blue ${cmc(User.btn, User.w50)}`}>로그인</Link>
                    <button type="submit" className={`btn_grey ${cmc(User.btn, User.w50)}`}>
                        <Link to='/account/find-password'>
                            비밀번호 찾기
                        </Link>
                    </button>

                </div>
            </UserFormBox>
        )
    }

    return (
        <UserFormBox title='아이디 찾기' find={true}>
            <ul className={cm(User.form_list, User.form_select)}>
                <UserFormItem active={byTel} errorText={inputField.error.tel}>
                    {/*활성화시 active 추가*/}
                    <div className={`radio_box ${User.radio_box} ${User.div}`}>
                        <input type="radio" name="radio" id="radio" checked={byTel}/>
                        <label htmlFor="radio" className={User.form_label} onClick={toggleRadio}>휴대폰 번호로 찾기</label>
                    </div>
                    <UserFormInput name='tel' inputField={inputField}>
                        <button type="button" className={cm(User.form_btn, User.auth, `${isSent && User.resend}`)}
                                onClick={sendAuthNumber}>{isSent ? '재발송' : '인증번호 받기'}</button>
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
                <UserFormItem active={!byTel} errorText={inputField.error.email}>
                    {/*활성화시 active 추가*/}
                    <div className={`radio_box ${User.radio_box} ${User.div}`}>
                        <input type="radio" name="radio" id="radio" checked={!byTel}/>
                        <label htmlFor="radio" className={User.form_label} onClick={toggleRadio}>이메일로 찾기</label>
                    </div>
                    <UserFormInput name='email' inputField={inputField}>
                        <button type="button" className={cm(User.form_btn, User.auth, `${isSent && User.resend}`)}
                                onClick={sendAuthNumber}>{isSent ? '재발송' : '인증번호 받기'}</button>
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
            <UserFormBtnBox value='다음' onClick={submit}/>
        </UserFormBox>
    )
}