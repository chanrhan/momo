import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import NotFound from "../../../src/js/common/module/NotFound";
import {ObjectUtils} from "../../utils/objectUtil";
import {cssUtils} from "../../utils/cssUtils";
import useInputField from "../../hook/useInputField";
import useApi from "../../hook/useApi";

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
    const {publicApi} = useApi();
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
        await publicApi.existUserId(idInput).then(({status,data})=>{
             if(status === 200){
                 // console.log(response.data)
                 if(data){
                     setError(null);
                     setUserId(idInput);
                     setStep(2);
                 }else{
                     setError('입력한 아이디가 존재하지 않습니다.');
                 }
             }
        })

    }


    return (
        <div>
            <h3>비밀번호 찾기</h3>
            <h6>키즈노트에 가입한 아이디를 입력해 주세요</h6>
            <div>
                <input type="text" placeholder='아이디' className={cssUtils.borderDangerIfError(error)} onChange={handleIdInput}/>
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
    const inputField = useInputField(['tel']);
    const {publicApi} = useApi();
    const [findBy, setFindBy] = useState('tel');
    const [secretInfo, setSecretInfo] = useState({
        tel: null,
        email: null
    });

    const [authNumber, setAuthNumber] = useState(null);

    useEffect(()=>{
        publicApi.getProtectedTelAndEmail(userId).then(({status, data})=>{
            if(status === 200){
                setSecretInfo(data);
            }
        })
    },[])

    useEffect(()=>{
        inputField.clearOf([findBy]);
    }, [findBy])

    const sendAuthNuber = async ()=>{
        await publicApi.matchUserId(findBy, {
            id: userId,
            [findBy]: inputField.input[findBy]
        }).then(({status,data})=>{
            if(status === 200){
                if(data){
                    inputField.handleError(findBy, null);
                    // 인증번호 보내는 API
                    setAuthNumber(123);
                    alert('인증번호가 발송되었습니다')
                }else{
                    inputField.handleError(findBy, '입력하신 정보와 일치하는 회원 정보가 없습니다');
                }
            }
        })
    }

    const submit = ()=>{
        if(inputField.validateAll() && inputField.matchAuthNumber(authNumber)){
            setStep(3);
        }
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
                        findBy === 'tel' ? <FindBy by='tel' error={inputField.error} handleInput={inputField.handleInput} sendAuthNumber={sendAuthNuber}/> : null
                    }
                </div>
                <div>
                    <div className='d-flex flex-row justify-content-center'>
                        <input type="radio" name='find_form' onClick={()=>{
                            setFindBy('email')
                        }}/> <p>이메일로 찾기 ({secretInfo.email})</p>
                    </div>
                    {
                        findBy === 'email' ? <FindBy by='email' error={inputField.error} handleInput={inputField.handleInput} sendAuthNumber={sendAuthNuber}/> : null
                    }
                </div>
                <div className='d-flex flex-row justify-content-center mt-3'>
                    <button className='btn btn-outline-primary' onClick={()=>{
                        setStep(1);
                    }}>이전</button>
                    <button className='btn btn-outline-primary ms-2' onClick={submit}>다음</button>
                </div>
            </div>
        </div>
    )
}

function FindBy({by, error, handleInput, sendAuthNumber}){
    return (
        <div className='mt-1'>
            <div className='d-flex flex-row justify-content-center mt-2'>
                <input type="text" className={cssUtils.borderDangerIfError(error[by])} name={by} placeholder={by === 'tel' ? '휴대전화번호':'이메일'} onChange={handleInput}/>
                <button className='btn btn-outline-secondary ms-3' onClick={sendAuthNumber}>인증번호 전송</button>
            </div>
            {
                error[by] && <p className='text-danger'>{error[by]}</p>
            }
            <input type="text" className={`mt-2 ${cssUtils.borderDangerIfError(error.auth_code)}`} name='auth_code' placeholder='인증번호 입력' onChange={handleInput}/>
            {
                error.auth_code && <p className='text-danger'>{error.auth_code}</p>
            }
        </div>
    )
}

function FindPasswordStep3({setStep, userId}){
    const navigate = useNavigate();
    const inputField = useInputField(['pwd','pwd2']);
    const {publicApi} = useApi();
    const [resetToken, setResetToken] = useState(null);

    // const [pageTimeout, setPageTimeout] = useState(null);

    useEffect(()=>{
        publicApi.getResetToken({
            id: userId
        }).then(({status,data})=>{
            if(status === 200){
                setResetToken(data);
            }
        })
    }, [])

    const submit = async ()=>{
        if(inputField.validateAll()){
            await publicApi.resetPassword({
                id: userId,
                pwd: inputField.input.pwd
            }, resetToken).then(({status,data})=>{
                if(status === 200 && data){
                    if(window.confirm('비밀번호가 성공적으로 재설정되었습니다. [확인]을 누르시면 로그인 페이지로 이동합니다')){
                        navigate('/account/login');
                    }else{
                        setTimeout(()=>{
                            navigate('/account/login');
                        }, 2000);
                    }
                }
            })
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
                    <input type="password" className={cssUtils.borderDangerIfError(inputField.error.pwd)} name='pwd' placeholder='비밀번호' onChange={inputField.handlePassword}/>
                    <h6>영문자, 숫자, 특수문자를 포함하여 8~32자로 설정해야 합니다</h6>
                </div>
                {
                    inputField.error.pwd && <p className='text-danger'>{inputField.error.pwd}</p>
                }
            </div>
            <div>
                <div>
                    <h5>새 비밀번호 재입력</h5>
                    <input type="password" name='pwd2' className={cssUtils.borderDangerIfError(inputField.error.pwd2)} value={inputField.input.pwd2} placeholder='비밀번호 재입력' onChange={inputField.handleConfirmPassword}/>
                </div>
                {
                    inputField.error.pwd2 && <p className='text-danger'>{inputField.error.pwd2}</p>
                }
            </div>
            <div className='d-flex flex-row justify-content-center mt-3'>
                <button className='btn btn-outline-primary' onClick={()=>{
                    setStep(2);
                }}>이전</button>
                <button className='btn btn-outline-primary ms-2' onClick={submit}>다음</button>
            </div>
        </div>
    )
}

export default FindPassword;