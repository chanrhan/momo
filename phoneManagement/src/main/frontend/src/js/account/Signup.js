import User from "../../css/user.module.css"
import {Link, useNavigate} from "react-router-dom";
import {UserFormItem} from "./module/UserFormItem";
import {UserTermList} from "./module/UserTermList";
import {UserFormInput} from "./module/UserFormInput";
import useValidateInputField from "../hook/useValidateInputField";
import React, {useEffect, useRef, useState} from "react";
import useApi from "../hook/useApi";
import {setRefreshToken} from "../utils/Cookies";
import {authActions} from "../store/slices/authSlice";
import {ObjectUtils} from "../utils/objectUtil";
import {cm, cmc} from "../utils/cm";
import {useDispatch} from "react-redux";
import {TelePhoneInput} from "../common/inputbox/TelePhoneInput";
import {PasswordInput} from "../common/inputbox/PasswordInput";
import useModal from "../hook/useModal";
import {ModalType} from "../common/modal/ModalType";
import {AxiosApi} from "../api/ApiCommon";
import {UserFormBox} from "./module/UserFormBox";
import {UserFormList} from "./module/UserFormList";

const MINUTES_IN_MS = 5 * 60 * 1000;
const INTERVAL = 1000;

const SIGNUP_INPUTFIELD = [
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
    },
    {
        recommend_code: null
    }
]


export function Signup(){
    const [step, setStep] = useState(0)
    const inputField = useValidateInputField(SIGNUP_INPUTFIELD);

    return (
        <main>
            <div>
                <form className={`${User.user_box} ${User.user_form}`}>
                    <h2 className={User.user_title}>회원가입</h2>

                    <StepSelector step={step} inputField={inputField} setStep={setStep}/>

                    {/*{*/}
                    {/*    step === 0 ? <Step1 inputField={inputField} setStep={setStep}/> :*/}
                    {/*        <Step2 inputField={inputField} setStep={setStep}/>*/}
                    {/*}*/}

                    <div className={`${User.user_link} ${User.link_login}`}>이미 회원이신가요?
                        <Link to='/account/login' className={User.a}>로그인</Link>
                    </div>
                </form>
            </div>
        </main>
    )
}

function StepSelector({step, inputField, setStep}){
    switch (step){
        case 0:
            return <Step1 inputField={inputField} setStep={setStep}/>
        case 1:
            return <Step2 inputField={inputField} setStep={setStep}/>
        case 2:
            return <Step3 inputField={inputField} setStep={setStep}/>
    }
    return null;
}

function Step1({inputField, setStep}){
    const {publicApi} = useApi();
    const nav = useNavigate()
    const modal = useModal();


    const validateAndStep = ()=>{
        const idVal = inputField.validateOne("id");
        const pwdVal = inputField.validateOne("pwd")
        const pwdMatchedVal = inputField.matchPassword()
        if( idVal && pwdVal
            && pwdMatchedVal){
            publicApi.existUserId(inputField.get("id")).then(({status,data})=>{
                if(status === 200){
                    if(data){
                        inputField.handleError('id','이미 존재하는 아이디입니다.')
                        modal.openModal(ModalType.SNACKBAR.Alert,{
                            msg: '이미 존재하는 아이디입니다'
                        })
                    }else{
                        setStep(1);
                    }
                }
            })
        }
    }

    return (
        <>
            <ul className={User.form_list}>
                <UserFormItem errorText={inputField.error.id}>
                    <UserFormInput subject='아이디' name='id' inputField={inputField}
                                   placeholder='아이디를 입력해주세요.' autoComplete='off'/>
                </UserFormItem>
                <UserFormItem errorText={inputField.error.pwd}>
                    <label htmlFor='pwd' className={User.form_label}>비밀번호</label>
                    <div className={`${User.form_inp} ${User.div} ${User.form_search_btn}`}>
                        <PasswordInput name='pwd' value={inputField.get('pwd')}
                                       className={`inp ${User.inp}`}
                                       placeholder='비밀번호를 입력해주세요.'
                                       autoComplete='new-password'
                                       onChange={inputField.handlePassword}/>
                    </div>
                    {/*<UserFormInput subject='비밀번호' name='pwd' inputField={inputField} onChange={inputField.handlePassword}/>*/}
                </UserFormItem>
                <UserFormItem errorText={inputField.error.pwd2}>
                    <label htmlFor='pwd' className={User.form_label}>비밀번호 확인</label>
                    <div className={`${User.form_inp} ${User.div} ${User.form_search_btn}`}>
                        <PasswordInput name='pwd2' value={inputField.get('pwd2')}
                                       className={`inp ${User.inp}`}
                                       placeholder='비밀번호를 한 번 더 입력해주세요.'
                                       onChange={inputField.handleConfirmPassword}/>
                    </div>
                </UserFormItem>
            </ul>
            <div className={User.form_btn_box}>
                <button type="button" className={`btn_grey ${cmc(User.btn)} ${User.w50}`} onClick={()=>{
                    nav('/account/login')
                }}>이전
                </button>
                <button type="button" className={`btn_blue ${cmc(User.btn)}`} onClick={validateAndStep}>다음</button>
            </div>
        </>
    )
}

function Step2({inputField, setStep}) {
    const modal = useModal();
    const [authNumber, setAuthNumber] = useState("")

    const [timeLeft, setTimeLeft] = useState(0)

    const [termList, setTermList] = useState(new Array(2).fill(false));
    const [isSent, setIsSent] = useState(false)

    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        inputField.clearOf("auth_code")
        setAuthNumber("")
    }, []);

    useEffect(() => {
        let timer = null;
        if (timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - INTERVAL);
            }, INTERVAL)
            if (timeLeft <= 0) {
                clearInterval(timer)
            }
        }
        return () => {
            clearInterval(timer)
        }
    }, [timeLeft]);

    const toggleTerm = (index) => {
        // console.log(`key: ${index}`)
        const copy = [...termList];
        copy[index] = !copy[index];
        setTermList(copy)
    }

    const sendAuthNumber = async () => {
        if (inputField.validateOne('tel')) {
            setAuthenticated(false)
            setIsSent(true)
            // 휴대폰번호로 인증번호 보내는 로직
            let tel: string = inputField.get('tel');
            tel = tel.replaceAll("-", '');
            // await publicApi.sendAuthNumber(tel).then(({status,data})=>{
            //     let msg = null;
            //     console.log(data)
            //     if(status === 200 && data && !Number.isNaN(data)){
            //         msg = '인증번호를 전송했습니다.'
            //         setAuthNumber(Number(data))
            //         setTimeLeft(MINUTES_IN_MS)
            //         setIsSent(true)
            //     }else{
            //         msg = '전송에 실패하였습니다.'
            //         setAuthNumber(null)
            //         setTimeLeft(null)
            //         setIsSent(false)
            //     }
            //     modal.openModal(ModalType.SNACKBAR.Info, {
            //         msg: msg
            //     })
            // })
            modal.openModal(ModalType.SNACKBAR.Info, {
                msg: '인증번호는 123 입니다 [임시]'
            })
            setAuthNumber(123)
            setTimeLeft(MINUTES_IN_MS)
            setIsSent(true)
        }
    }

    const matchAuthNumber = ()=>{
        if(inputField.matchAuthNumber(authNumber)){
            setTimeLeft(0)
            setAuthenticated(true)
            // modal.openModal(ModalType.SNACKBAR.Info, {
            //     msg: '인증되었습니다.'
            // })
        }else{
            setAuthenticated(false)
        }
    }

    const getTimerMS = ()=>{
        if(timeLeft <= 0){
            return '유효시간이 만료되었습니다. 인증번호를 다시 발송해주세요.'
        }
        const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, '0');
        const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');
        return `${minutes}:${second}`
    }

    const submit = async ()=>{
        if(!authenticated){
            modal.openModal(ModalType.SNACKBAR.Warn, {
                msg: '휴대폰번호를 인증해야 합니다.'
            })
            return;
        }
        if(inputField.validateAll()){
            if(!termList[0] || !termList[1]){
                modal.openModal(ModalType.SNACKBAR.Warn, {
                    msg: '[필수] 이용약관에 모두 동의해야 합니다.'
                })
                return;
            }
            inputField.put('terms', ObjectUtils.convertBooleanArrayToString(termList))
            setStep(2);
            // console.table(inputField.input)
        }
    }

    return (
        <>
            <ul className={User.form_list}>
                <UserFormItem errorText={inputField.error.name}>
                    <UserFormInput subject='이름' name='name' inputField={inputField}
                                   placeholder='이름을 입력해주세요' maxLength={20}/>
                </UserFormItem>
                <UserFormItem errorText={inputField.error.email}>
                    <UserFormInput subject='이메일' name='email' inputField={inputField}
                                   placeholder='이메일을 입력해주세요' maxLength={30}/>
                </UserFormItem>
                <UserFormItem errorText={inputField.error.tel}>
                    <label htmlFor='tel' className={User.form_label}>휴대폰 번호</label>
                    <div className={`${User.form_inp} ${User.div}`}>
                        <TelePhoneInput name='tel' value={inputField.get('tel')}
                                        className={`inp ${User.inp}`} placeholder='휴대폰 번호를 입력해주세요'
                                        onChange={e => {
                                            inputField.handleInput(e)
                                            setAuthNumber(null)
                                            setTimeLeft(0)
                                            setIsSent(false)
                                            setAuthenticated(false)
                                        }}/>
                        <button type="button"
                                className={cm(User.form_btn, User.auth, `${isSent && User.resend}`)}
                                onClick={sendAuthNumber}>{isSent ? '재발송' : '인증번호 받기'}</button>
                    </div>
                    {/*<UserFormInput subject='휴대폰 번호' name='tel' inputField={inputField}>*/}

                    {/*</UserFormInput>*/}
                    <UserFormInput name='auth_code' inputField={inputField}
                                   readOnly={authenticated}
                                   placeholder='인증번호를 입력해주세요'>
                        <button type="button" className={User.form_btn}
                                disabled={authenticated}
                                onClick={matchAuthNumber}>
                            {authenticated ? '인증완료':'인증하기'}
                        </button>
                    </UserFormInput>
                    {
                        isSent && <div className={User.form_timer}>
                            {
                                authenticated ? <span className={User.timer_text}>인증되었습니다!</span>
                                    : <>
                                            <span className={User.timer_text}>{timeLeft <= 0 ? '' : '유효시간 '}<span
                                                className={cm(User.timer_num, `${timeLeft <= 0 && User.red}`)}>{getTimerMS()}</span></span>
                                        <button type="button" className={User.timer_btn}
                                                onClick={sendAuthNumber}>재발송
                                        </button>
                                    </>
                            }
                        </div>
                    }
                </UserFormItem>
                <UserFormItem errorText={inputField.error.recommend_code}>
                    <UserFormInput subject='추천인 코드 (선택)' name='recommend_code' inputField={inputField}
                                   placeholder='추천인 코드를 입력해주세요' maxLength={10}/>
                </UserFormItem>
            </ul>
            <div className={User.form_agree}>
                <ul className={User.agree_list}>
                    <UserTermList subject='이용약관' index={0} value={termList[0]} onClick={toggleTerm}/>
                    <UserTermList subject='개인정보처리방침' index={1} value={termList[1]} onClick={toggleTerm}/>
                </ul>
            </div>

            <div className={User.form_btn_box}>
                <button type="button" className={`btn_grey ${cmc(User.btn)} ${User.w50}`} onClick={() => {
                    setStep(0)
                }}>이전
                </button>
                <button type="button" className={`btn_blue ${cmc(User.btn)}`} onClick={submit}>다음</button>
            </div>
            {/*<div className={User.form_btn_box}>*/}
            {/*    <button type="button" className={`btn btn_blue ${User.btn}`} onClick={submit}>가입완료</button>*/}
            {/*</div>*/}
        </>
    )
}

function Step3({inputField, setStep}){
    const {publicApi, userApi} = useApi();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const modal = useModal()

    const [bnChecked, setBnChecked] = useState(false)


    const submit = async ()=>{
        if(!bnChecked){
            modal.openModal(ModalType.SNACKBAR.Warn, {
                msg: "사업자번호를 인증해야 합니다."
            })
            return;
        }

        await publicApi.signup(inputField.input).then(({status, data, headers})=>{
            if(status === 200 && data){
                const accessToken = headers.get('authorization')
                const refreshtoken = headers.get('refreshtoken');
                const refreshexpiretime = headers.get('refreshexpiretime');
                dispatch(authActions.setAccessToken(accessToken));
                setRefreshToken(refreshtoken, refreshexpiretime);
                navigate('/service');
            }
        })

    }

    const checkBrNoStatus = ()=>{
        const bn = inputField.get('br_no');
        if(ObjectUtils.isEmpty(bn)){
            modal.openModal(ModalType.SNACKBAR.Warn, {
                msg: "사업자번호를 입력해 주십시오"
            })
            return;
        }
        if(inputField.validateOne('br_no')){
            userApi.checkBrNoStatus(bn).then(({status,data})=>{
                if(status === 200){
                    if(data === true){
                        modal.openModal(ModalType.SNACKBAR.Info, {
                            msg: '사업자번호 인증에 성공하였습니다.'
                        })
                        setBnChecked(true)
                    }
                        // else if(!ObjectUtils.isEmpty(data.id)){
                        //     msg = '동일한 사업자번호로 가입된 계정이 존재합니다.'
                    // }
                    else{
                        modal.openModal(ModalType.SNACKBAR.Alert, {
                            msg: '존재하지 않는 사업자번호입니다.'
                        })
                    }

                }
            })
        }
    }

    return (
        <>
            <UserFormList>
                {/*<UserFormItem errorText={inputField.error.corp_nm}>*/}
                {/*    <UserFormInput name='corp_nm' inputField={inputField} subject='사업자 등록'*/}
                {/*                   placeholder='회사명을 입력하세요.'/>*/}
                {/*</UserFormItem>*/}
                <UserFormItem style={{marginTop: 10}} errorText={inputField.error.br_no}>
                    <UserFormInput subject="사업자 등록" readOnly={bnChecked} name='br_no' inputField={inputField}
                                   placeholder='-을 제외한 사업자등록번호 10자리를 입력하세요.'>
                        <button type="button" className={User.form_btn}
                                disabled={bnChecked}
                                onClick={checkBrNoStatus}>
                            {bnChecked ? "인증완료" : "인증하기"}
                        </button>
                    </UserFormInput>
                </UserFormItem>
            </UserFormList>

            <div className={User.form_btn_box}>
                <button type="button" className={`btn_grey ${cmc(User.btn)} ${User.w50}`} onClick={() => {
                    setStep(1)
                }}>이전
                </button>
                <button type="button" className={`btn_blue ${cmc(User.btn)}`} onClick={submit}>다음</button>
            </div>
            {/*<div className={User.form_btn_box}>*/}
            {/*    /!*<Link className={`btn_grey ${User.w30} ${cmc(User.btn)}`} to='/shop/list'>이전</Link>*!/*/}
            {/*    <button type="button" className={`btn_blue ${cmc(User.btn)}`} onClick={submit}>다음</button>*/}
            {/*</div>*/}
        </>
    )
}

