import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {authActions} from "../../store/slices/authSlice";
import {setRefreshToken} from "../../utils/Cookies";
import {useDispatch} from "react-redux";
import {ObjectUtils} from "../../utils/objectUtil";
import useValidation from "../../hook/useValidation";
import useApi from "../../hook/useApi";

const ERR_BORDER_CSS = 'border border-danger';

function Signup(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const valid = useValidation(['id','pwd','pwd2','name','tel','email'])
    const {publicApi} = useApi();
    const [authNumber, setAuthNumber] = useState(null)

    const [terms, setTerms] = useState(new Array(4).fill(false));
    const [checkedAgreeAll, setCheckedAgreeAll] = useState(false);

    const [termError, setTermError] = useState(false);

    const submit = async ()=>{
        if(valid.validateAll() && valid.matchAuthNumber(authNumber)){
            if(!terms[0] || !terms[1]){
                setTermError(true);
                return;
            }else {
                setTermError(false);
            }

            await publicApi.signup({
                ...valid.input,
                terms: ObjectUtils.convertBooleanArrayToString(terms)
            }).then(res=>{
                if(res.status === 200){
                    dispatch(authActions.setAccessToken(res.jwt.access_token));
                    setRefreshToken(res.jwt.refresh_token);
                    alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다")
                    navigate('/account/login');
                    // navigate('/account/role');
                }else{
                    valid.handleServerError("서버 연결에 실패하였습니다. 다시 시도해주세요")
                }
            })

        }
    }

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

    const sendAuthCode = ()=>{
        // 인증번호 보내는 API
        alert("인증번호가 발송되었습니다")
        setAuthNumber('123');
    }

    return (
        <div>
            <p className='debug-page'>Signup Page</p>
            <h2>회원가입</h2>
            <p>회원가입 정보를 정확히 입력해주세요</p>
            {/*<SignupStepSelector/>*/}
            <div className='mt-2'>
                <h5 className='text-dark'>이름</h5>
                <input type="text" className={valid.error.name && ERR_BORDER_CSS} name='name' value={valid.input.name} onChange={valid.handleInput} placeholder='이름'/>
                {
                    valid.error.name && <p className='text-danger'>{valid.error.name}</p>
                }
            </div>
            <div className='mt-2'>
                <h5 className='text-dark'>이메일</h5>
                <input type="text" className={valid.error.email && ERR_BORDER_CSS} name='email' value={valid.input.email} onChange={valid.handleInput} placeholder='이메일'/>
                {
                    valid.error.email && <p className='text-danger'>{valid.error.email}</p>
                }
            </div>
            <div className='mt-2'>
                <h5 className='text-dark'>전화번호</h5>
                <input type="text" className={valid.error.tel && ERR_BORDER_CSS} name='tel' value={valid.input.tel} onChange={valid.handleInput} placeholder='휴대전화번호'/>
                {
                    valid.error.tel && <p className='text-danger'>{valid.error.tel}</p>
                }
            </div>
            <div className='mt-2'>
                <h5 className='text-dark'>인증번호</h5>
                <button className='btn btn-outline-secondary' onClick={sendAuthCode}>인증번호 전송</button>
                <br/>
                <input className={`mt-1 ${valid.error.auth_code && ERR_BORDER_CSS}`} name='auth_code' type="text" onChange={valid.handleInput} placeholder='인증번호 입력'/>
                {
                    valid.error.auth_code && <p className='text-danger'>{valid.error.auth_code}</p>
                }
            </div>
            <div className='mt-2'>
                <h5 className='text-dark'>아이디</h5>
                <input type="text" name='id' value={valid.input.id} onChange={valid.handleInput} placeholder='아이디'/>
                {
                    valid.error.id && <p className='text-danger'>{valid.error.id}</p>
                }
            </div>
            <div className='mt-2'>
                <h5 className='text-dark'>비밀번호</h5>
                <input type="password" name='pwd' onChange={valid.handlePassword} placeholder='비밀번호'/>
                {
                    valid.error.pwd && <p className='text-danger'>{valid.error.pwd}</p>
                }
            </div>
            <div className='mt-2'>
                <h5 className='text-dark'>비밀번호 확인</h5>
                <input type="password" name='pwd2' value={valid.input.pwd2} onChange={valid.handleConfirmPassword} placeholder='비밀번호 확인'/>
                {
                    valid.error.pwd2 && <p className='text-danger'>{valid.error.pwd2}</p>
                }
            </div>
            <div className='mt-2 d-flex justify-content-center'>
                <h5 className='text-dark'>약관 동의</h5>
                <div>
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
                termError && <p className='text-danger'><b>(필수)</b>이용약관에 모두 동의해야 합니다</p>
            }
            {
                valid.serverError && <h5 className='text-danger'>{valid.serverError}</h5>
            }
            <div>
                <button className='btn btn-primary' onClick={submit}>가입하기</button>
            </div>
        </div>
    )
}

export default Signup;