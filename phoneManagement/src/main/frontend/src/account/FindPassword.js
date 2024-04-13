import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import NotFound from "../component/common/NotFound";
import {existUserId, getResetToken, getTelEmailSecretly, matchUserId, resetPassword} from "../api/AccountApi";
import {ObjectUtils} from "../utils/objectUtil";
import {validateUtils} from "../utils/validateUtils";

function FindPassword(){


    return (
        <div>
            <p className='debug-page'>Find Password Page</p>
            <StepSelector/>
        </div>
    )
}

function StepSelector(){
    const [step, setStep] = useState(1)

    const [userId, setUserId] = useState(null);

    switch (step){
        case 1:
            return <FindPasswordStep1 setStep={setStep} setUserId={setUserId}/>;
        case 2:
            return <FindPasswordStep2 setStep={setStep} userId={userId}/>;
        case 3:
            return <FindPasswordStep3 setStep={setStep} userId={userId}/>;
        default:
            return <NotFound/>
    }
}

function FindPasswordStep1({setStep, setUserId}){
    const naviagte = useNavigate();
    const [idInput, setIdInput] = useState('');

    const [error, setError] = useState(null);

    const handleIdInput = (e)=>{
        setIdInput(e.target.value);
    }

    const existsId = async ()=>{
        if(ObjectUtils.isEmpty(idInput)){
            setError('아이디를 입력해주세요');
            return;
        }
        const response = await existUserId(idInput);
        if(response.status === 200){
            console.log(response.data)
            if(response.data){
                setError(null);
                setUserId(idInput);
                setStep(2);
            }else{
                setError('입력한 아이디가 존재하지 않습니다.');
            }
        }
    }


    return (
        <div>
            <h3>비밀번호 찾기</h3>
            <h6>키즈노트에 가입한 아이디를 입력해 주세요</h6>
            <div>
                <input type="text" placeholder='아이디' onChange={handleIdInput}/>
                <div className='d-flex flex-row justify-content-center text-secondary'>
                    <p>아이디가 기억나지 않는다면? </p>
                    <u className='ms-2' onClick={()=>{
                        naviagte('/account/find-username')
                    }}>아이디 찾기</u>
                </div>
            </div>
            {
                error && <p className='text-danger'>{error}</p>
            }
            <div>
                <button className='btn btn-outline-primary' onClick={existsId}>다음</button>
            </div>
        </div>
    )
}

function FindPasswordStep2({setStep, userId}){
    const [findBy, setFindBy] = useState('tel');
    const [secretInfo, setSecretInfo] = useState({
        tel: null,
        email: null
    });
    const [findInput, setFindInput] = useState({
        tel: null,
        email: null,
        auth_code: null
    });

    const [error, setError] = useState({
        tel: null,
        email: null,
        auth_code: null
    })

    const [authNumber, setAuthNumber] = useState(null);

    useEffect(()=>{
        getTel();
    },[])

    useEffect(()=>{
        setError({
            tel: null,
            email: null
        })
    }, [findBy])

    const getTel = async ()=>{
        const response = await getTelEmailSecretly(userId);
        if(response.status === 200){
            setSecretInfo(response.data);
        }
    }

    const handleFindInput = (e)=>{
        const key = e.target.name;
        const value = e.target.value;
        if(ObjectUtils.isEmpty(value)){
            handleError(key, null);
        }else{
            if(!validateUtils.validate(key, value, handleError)){
                return;
            }
        }

        setFindInput(prev=>(
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ));
    }

    const sendAuthNuber = ()=>{
        validateBeforeSend().then(res=>{
            if(res){
                // 인증번호 보내는 API
                setAuthNumber(123);
                alert('인증번호가 발송되었습니다')
            }
        })
    }

    const handleError = (key, msg)=>{
        setError(prev=>({
            ...prev,
            [key]: msg
        }))
    }

    const validateBeforeSend = async ()=>{
        const data = {
            id: userId,
            [findBy]: findInput[findBy]
        }
        const response = await matchUserId(findBy, data);
        if(response.status === 200){
            if(response.data){
                handleError(findBy, null);
                return true;
            }else{
                handleError(findBy, '입력하신 정보와 일치하는 회원 정보가 없습니다');
            }
        }
        return false;
    }

    const validateBeforeSubmit = ()=>{
        if(ObjectUtils.isEmpty(findInput.auth_code)){
           handleError('auth_code', '인증번호를 입력해 주세요')
            return;
        }

        if(authNumber != findInput.auth_code){
            handleError('auth_code', '인증번호가 일치하지 않습니다');
            return;
        }

        setStep(3);
    }

    return (
        <div>
            <h3>비밀번호 찾기</h3>
            <h6>비밀번호 재설정을 위해 인증수단을 선택한 후 내용을 입력해 주세요</h6>
            <h6>개인정보 보호를 위해 연락처 일부가 *로 표기됩니다</h6>
            <div className='d-flex flex-column justify-content-center'>
                <div>
                    <div className='d-flex flex-row justify-content-center'>
                        <input type="radio" name='find_form' defaultChecked={true} onClick={()=>{
                            setFindBy('tel')
                        }}/> <p className='ms-2'>휴대전화번호로 찾기 ({secretInfo.tel})</p>
                    </div>

                    {
                        findBy === 'tel' ? <FindBy by='tel' error={error} handleFindInput={handleFindInput} sendAuthNumber={sendAuthNuber}/> : null
                    }
                </div>
                <div>
                    <div className='d-flex flex-row justify-content-center'>
                        <input type="radio" name='find_form' onClick={()=>{
                            setFindBy('email')
                        }}/> <p>이메일로 찾기 ({secretInfo.email})</p>
                    </div>
                    {
                        findBy === 'email' ? <FindBy by='email' error={error} handleFindInput={handleFindInput} sendAuthNumber={sendAuthNuber}/> : null
                    }
                </div>
                <div className='d-flex flex-row justify-content-center mt-3'>
                    <button className='btn btn-outline-primary' onClick={()=>{
                        setStep(1);
                    }}>이전</button>
                    <button className='btn btn-outline-primary ms-2' onClick={validateBeforeSubmit}>다음</button>
                </div>
            </div>
        </div>
    )
}

function FindBy({by,error, handleFindInput, sendAuthNumber}){
    return (
        <div className='mt-1'>
            <div className='d-flex flex-row justify-content-center mt-2'>
                <input type="text" name={by} placeholder={by === 'tel' ? '휴대전화번호':'이메일'} onChange={handleFindInput}/>
                <button className='btn btn-outline-secondary ms-3' onClick={sendAuthNumber}>인증번호 전송</button>
            </div>
            {
                error[by] && <p className='text-danger'>{error[by]}</p>
            }
            <input type="text" className='mt-2' name='auth_code' placeholder='인증번호 입력' onChange={handleFindInput}/>
            {
                error.auth_code && <p className='text-danger'>{error.auth_code}</p>
            }
        </div>
    )
}

function FindPasswordStep3({setStep, userId}){
    const [resetToken, setResetToken] = useState(null);
    const [input, setInput] = useState({
        pwd: '',
        pwd2: ''
    })

    const [error, setError] = useState({
        pwd: null,
        pwd2: null
    })

    useEffect(()=>{
        const getToken = async ()=>{
            const response = await getResetToken({
                id: userId
            });
            if(response.status === 200){
                setResetToken(response.data);
                console.log(`reset token: ${response.data}`)
            }
        }
        getToken();
    }, [])

    const handleError = (key, msg)=>{
        setError(prev=>({
            ...prev,
            [key]: msg
        }))
    }

    const handlePasswordInput = (e)=>{
        setInput(prev=>({
            ...prev,
            'pwd2': ''
        }))
        const key = e.target.name;
        const value = e.target.value;
        if(ObjectUtils.isEmpty(value)){
            handleError(key, null);
        }else{
            validateUtils.validate(key, value, handleError)
        }
        handleInput(e);
    }

    const handleInput = (e)=>{
        setInput(prev=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const matchPassword = (e)=>{
        validateUtils.matchPassword(input.pwd, e.target.value, handleError);
        handleInput(e);
    }

    const validateBeforeSubmit = async ()=>{
        const vp = validateUtils.validate('pwd',input.pwd, handleError);
        const vp2 = validateUtils.matchPassword(input.pwd, input.pwd2, handleError);

        if(vp && vp2){
            const response = await resetPassword({
                id: userId,
                pwd: input.pwd
            }, resetToken);
            if(response.status === 200 && response.data){
                alert("비밀번호가 성공적으로 재설정되었습니다")
            }
        }
    }

    return (
        <div>
            <h3>비밀번호 재설정</h3>
            <h6>비밀번호 변경을 할 경우, 동일한 계정으로 자동 로그인이 되어 있는
                모든 기기에서 변경된 비밀번호로 다시 로그인을 하셔야 합니다</h6>
            <div>
                <div>
                    <h5>새 비밀번호</h5>
                    <input type="password" name='pwd' placeholder='비밀번호' onChange={handlePasswordInput}/>
                    <h6>영문자, 숫자, 특수문자를 포함하여 8~32자로 설정해야 합니다</h6>
                </div>
                {
                    error.pwd && <p className='text-danger'>{error.pwd}</p>
                }
            </div>
            <div>
                <div>
                    <h5>새 비밀번호 재입력</h5>
                    <input type="password" name='pwd2' value={input.pwd2} placeholder='비밀번호 재입력' onChange={matchPassword}/>
                </div>
                {
                    error.pwd2 && <p className='text-danger'>{error.pwd2}</p>
                }
            </div>
            <div className='d-flex flex-row justify-content-center mt-3'>
                <button className='btn btn-outline-primary' onClick={()=>{
                    setStep(2);
                }}>이전</button>
                <button className='btn btn-outline-primary ms-2' onClick={validateBeforeSubmit}>다음</button>
            </div>
        </div>
    )
}

export default FindPassword;