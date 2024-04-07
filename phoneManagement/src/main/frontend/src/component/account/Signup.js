import {useEffect, useState} from "react";
import {emailRegex, idRegex, pwdRegex, scRegex, telRegex} from "../../utils/regex";
import {convertArrayToString, isAllEmptyInMap, isEmpty} from "../../utils/objectUtil";
import {signup} from "../../api/Account";
import {useNavigate} from "react-router-dom";
import {authActions} from "../../store/slices/authSlice";
import {setRefreshToken} from "../../utils/Cookies";
import {useDispatch} from "react-redux";

const ERR_BORDER_CSS = 'border border-danger';

function Signup(){
    return (
        <div>
            <p className='debug-page'>Signup Page</p>
            <h2>회원가입</h2>
            <p>회원가입 정보를 정확히 입력해주세요</p>
            <SignupStepSelector/>
        </div>
    )
}

function SignupStepSelector(){
    const [step, setStep] = useState(1);
    const [signupInput, setSignupInput] = useState({
        name: '',
        tel: '',
        email: '',
        id: '',
        pwd: ''
    })

    const handleSignupInput = async (e)=>{
        setSignupInput((prev)=>(
            {
                ...prev, [e.target.name]:e.target.value
            }
        ));
    }

    switch (step){
        case 1:
            return <SignupStep1 setStep={setStep} signupInput={signupInput} handleInput={handleSignupInput}/>
        case 2:
            return <SignupStep2 setStep={setStep} signupInput={signupInput} handleInput={handleSignupInput}/>
        case 3:
            return <SignupStep3 setStep={setStep} signupInput={signupInput} handleInput={handleSignupInput}/>
        default:
            return <div>Not Found</div>
    }
}

function SignupStep1(props){
    const [error, setError] = useState({
        name: null,
        tel: null,
        email: null,
        auth_code: null
    });
    const [authCodeInput, setAuthCodeInput] = useState(null);
    const [authCode, setAuthCode] = useState(null);

    const handleInput = (e)=> {
        let value = e.target.value;
        if (isEmpty(value)) {
            handleError(e.target.name, null);
        } else {
            if(value.length > 32){
                return;
            }
            validate(e.target.name, e.target.value, handleError);
        }
        props.handleInput(e);
    }

    const handleError = (key, msg)=>{
        setError((prev)=>(
            {
                ...prev, [key]: msg
            }
        ));
    }

    const validateBeforeSubmit = ()=>{
        let name = props.signupInput.name;
        let tel = props.signupInput.tel;
        let email = props.signupInput.email;

        let result = 0;

        result += validate('name', name, handleError) ? 0 : 1;
        result += validate('tel', tel, handleError) ? 0 : 1;
        result += validate('email', email, handleError) ? 0 : 1;

        if(isEmpty(authCodeInput) || authCode !== authCodeInput){
            let {msg} = getErrorInfo('auth_code');
            handleError('auth_code', msg)
            result += 1;
        }else{
            handleError('auth_code', null)
        }

        if(result === 0){
            props.setStep(2);
        }
    }

    const sendAuthCode = ()=>{
        // 인증번호 보내는 API
        alert("인증번호가 발송되었습니다")
        setAuthCode('123');
    }

    const handleInputAuthCode = (e)=>{
        handleError('auth_code', null);
        setAuthCodeInput(e.target.value)
    }

    return (
        <div>
            <div className='mt-2'>
                <h5 className='text-dark'>이름</h5>
                <input type="text" className={error.name && ERR_BORDER_CSS} name='name' value={props.signupInput.name} onChange={handleInput} placeholder='이름'/>
                {
                    error.name && <p className='text-danger'>{error.name}</p>
                }
            </div>
            <div className='mt-2'>
                <h5 className='text-dark'>이메일</h5>
                <input type="text" className={error.email && ERR_BORDER_CSS} name='email' value={props.signupInput.email} onChange={handleInput} placeholder='이메일'/>
                {
                    error.email && <p className='text-danger'>{error.email}</p>
                }
            </div>
            <div className='mt-2'>
                <h5 className='text-dark'>전화번호</h5>
                <input type="text" className={error.tel && ERR_BORDER_CSS} name='tel' value={props.signupInput.tel} onChange={handleInput} placeholder='휴대전화번호'/>
                {
                    error.tel && <p className='text-danger'>{error.tel}</p>
                }
            </div>
            <div className='mt-2'>
                <h5 className='text-dark'>인증번호</h5>
                <button className='btn btn-outline-secondary' onClick={sendAuthCode}>인증번호 전송</button>
                <br/>
                <input className={`mt-1 ${error.auth_code && ERR_BORDER_CSS}`} name='auth_code' type="text" onChange={handleInputAuthCode} placeholder='인증번호 입력'/>
                {
                    error.auth_code && <p className='text-danger'>{error.auth_code}</p>
                }
            </div>
            <button className='mt-3 btn btn-outline-primary' onClick={validateBeforeSubmit}>다음</button>
        </div>
    )
}

function SignupStep2(props){
    const [error, setError] = useState({
        id: null,
        pwd: null,
        check_pwd: null
    })

    const [checkPwd, setCheckPwd] = useState('');

    const handleInput = (e)=> {
        let value = e.target.value;
        if (isEmpty(value)) {
            handleError(e.target.name, null);
        } else {
            if(value.length > 32){
                return;
            }
            validate(e.target.name, e.target.value, handleError);
        }
        props.handleInput(e);
    }

    const handleError = (key, msg)=>{
        setError((prev)=>(
            {
                ...prev, [key]: msg
            }
        ));
    }

    const handlePassword = (e)=>{
        setCheckPwd('');
        handleInput(e);
    }

    const handleCheckPassword = (e)=>{
        if(props.signupInput.pwd !== e.target.value){
            handleError('check_pwd', '비밀번호가 일치하지 않습니다')
        }else {
            handleError('check_pwd', null)
        }
        setCheckPwd(e.target.value);
    }

    const validateBeforeSubmit = ()=>{
        let id = props.signupInput.id;
        let pwd = props.signupInput.pwd;

        let result = 0;

        result += validate('id', id, handleError) ? 0 : 1;
        result += validate('pwd', pwd, handleError)  ? 0 : 1;

        result += (pwd === checkPwd) ? 0: 1;

        if(result === 0){
            props.setStep(3);
        }
    }

    return (
        <div>
            <div className='mt-2'>
                <h5 className='text-dark'>아이디</h5>
                <input type="text" name='id' value={props.signupInput.id} onChange={handleInput} placeholder='아이디'/>
                {
                    error.id && <p className='text-danger'>{error.id}</p>
                }
            </div>
            <div className='mt-2'>
                <h5 className='text-dark'>비밀번호</h5>
                <input type="password" name='pwd' onChange={handlePassword} placeholder='비밀번호'/>
                {
                    error.pwd && <p className='text-danger'>{error.pwd}</p>
                }
            </div>
            <div className='mt-2'>
                <h5 className='text-dark'>비밀번호 확인</h5>
                <input type="password" id='check_pwd' name='check_pwd' value={checkPwd} onChange={handleCheckPassword} placeholder='비밀번호 확인'/>
                {
                    error.check_pwd && <p className='text-danger'>{error.check_pwd}</p>
                }
            </div>
            <button className='mt-3 btn btn-outline-primary' onClick={()=>{
                props.setStep(1);
            }}>이전</button>
            <button className='ms-3 mt-3 btn btn-outline-primary' onClick={validateBeforeSubmit}>다음</button>
        </div>
    )
}

function SignupStep3(props){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [terms, setTerms] = useState(new Array(4).fill(false));
    const [checkedAgreeAll, setCheckedAgreeAll] = useState(false);

    const [error, setError] = useState(false);
    const [serverError, setServerError] = useState(false);

    const agreeAll = (e)=>{
        setCheckedAgreeAll(e.target.checked);
        setTerms([
            e.target.checked,
            e.target.checked,
            e.target.checked,
            e.target.checked
        ])
    }

    const handleAgree = (e, idx)=>{
        let copy = [...terms];
        copy[idx] = e.target.checked;
        setTerms(copy);
    }

    const validateBeforeSubmit = async ()=>{
        if(!terms[0] || !terms[1]){
            setError(true);
            return;
        }else {
            setError(false);
        }

        let body = {
            ...props.signupInput,
            terms: convertArrayToString(terms)
        };

        const response = await signup(body);
        console.log(response)
        if(response.status === 200){
            dispatch(authActions.setAccessToken(response.jwt.access_token));
            setRefreshToken(response.jwt.refresh_token);
            // console.log('success!')
            navigate('/account/role');
        }else{
            setServerError(true);
        }
    }

    return (
        <div>
            <div className='mt-2'>
                <h5 className='text-dark'>약관 동의</h5>
                <div className=''>
                    <div className='d-flex flex-row align-items-center ms-5'>
                        <input type="checkbox" onClick={agreeAll}/>
                        <h6 className='ms-1'>전체 동의</h6>
                    </div>
                    <div className='d-flex flex-row align-items-center ms-5'>
                        <input type="checkbox" checked={terms[0]} onChange={(e)=>{
                            handleAgree(e, 0);
                        }}/>
                        <h6 className='ms-1'><b>(필수)</b>이용 약관 동의</h6>
                    </div>
                    <div className='d-flex flex-row align-items-center ms-5'>
                        <input type="checkbox" checked={terms[1]} onChange={(e)=>{
                            handleAgree(e, 1);
                        }}/>
                        <h6 className='ms-1'><b>(필수)</b>개인정보 수집 및 이용 동의서</h6>
                    </div>
                    <div className='d-flex flex-row align-items-center ms-5'>
                        <input type="checkbox" checked={terms[2]} onChange={(e)=>{
                            handleAgree(e, 2);
                        }}/>
                        <h6 className='ms-1'><b>(선택)</b>제 3자 정보 제공 동의서</h6>
                    </div>
                </div>
            </div>
            {
                error && <p className='text-danger'><b>(필수)</b>이용약관에 모두 동의해야 합니다</p>
            }
            <button className='mt-3 btn btn-outline-primary' onClick={()=>{
                props.setStep(2);
            }}>이전</button>
            <button className='ms-3 mt-3 btn btn-outline-primary' onClick={validateBeforeSubmit}>다음</button>
            {
                serverError && <p className='text-danger'>오류가 발생했습니다. 다시 시도해주세요.</p>
            }
        </div>
    )
}



const validate = (key, value, handleError)=>{
    let {name, regex, msg} = getErrorInfo(key);
    if(isEmpty(value)){
        handleError(key, `'${name}'은(는) 필수값입니다`);
    }else{
        if(value.length === 0 || regex.test(value)){
            handleError(key, null);
            return true;
        }else{
            handleError(key, msg);
        }
    }
    return false;
}

const getErrorInfo = (key)=>{
    switch (key){
        case 'name':
            return {name: '이름', regex: scRegex, msg: '이름에 특수문자는 포함될 수 없습니다'};
        case 'tel':
            return {name: '전화번호', regex: telRegex, msg: '전화번호를 정확히 입력해주세요'};
        case 'email':
            return {name: '이메일', regex: emailRegex, msg: '유효한 이메일 주소를 입력해 주세요'};
        case 'auth_code':
            return {name: '인증번호', msg: '인증번호를 다시 확인해주세요'};
        case 'id':
            return {name: '아이디', regex: idRegex, msg: '5~32자리의 영문 소문자, 숫자만 입력해 주세요'};
        case 'pwd':
            return {name: '비밀번호', regex: pwdRegex, msg: '영문, 숫자, 특수문자가 적어도 1개씩 포함된 8~32자리를 입력해 주세요'};
    }
}

export default Signup;