import {useState} from "react";
import {useNavigate} from "react-router-dom";
import NotFound from "../common/NotFound";

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

    switch (step){
        case 1:
            return <FindPasswordStep1 setStep={setStep}/>;
        case 2:
            return <FindPasswordStep2 setStep={setStep}/>;
        case 3:
            return <FindPasswordStep3 setStep={setStep}/>;
        default:
            return <NotFound/>
    }
}

function FindPasswordStep1({setStep}){
    const naviagte = useNavigate();

    return (
        <div>
            <h3>비밀번호 찾기</h3>
            <h6>키즈노트에 가입한 아이디를 입력해 주세요</h6>
            <div>
                <input type="text" placeholder='아이디'/>
                <div className='d-flex flex-row justify-content-center text-secondary'>
                    <p>아이디가 기억나지 않는다면? </p>
                    <u className='ms-2' onClick={()=>{
                        naviagte('/account/find-username')
                    }}>아이디 찾기</u>
                </div>
            </div>
            <div>
                <button className='btn btn-outline-primary' onClick={()=>{
                    setStep(2);
                }}>다음</button>
            </div>
        </div>
    )
}

function FindPasswordStep2({setStep}){
    const [form, setForm] = useState(0);

    const handleCheck = (form)=>{
        setForm(form);
    }

    return (
        <div>
            <h3>비밀번호 찾기</h3>
            <h6>비밀번호 재설정을 위해 인증수단을 선택한 후 내용을 입력해 주세요</h6>
            <h6>개인정보 보호를 위해 연락처 일부가 *로 표기됩니다</h6>
            <div className='d-flex flex-column justify-content-center'>
                <div>
                    <input type="radio" name='find_form' defaultChecked={true} onClick={()=>{
                        handleCheck(0);
                    }}/> 휴대전화번호로 찾기
                    {
                        form === 0 ? <FindByTel/> : null
                    }
                </div>
                <div>
                    <input type="radio" name='find_form' onClick={()=>{
                        handleCheck(1);
                    }}/> 이메일로 찾기
                    {
                        form === 1 ? <FindByEmail/> : null
                    }
                </div>
                <div className='d-flex flex-row justify-content-center mt-3'>
                    <button className='btn btn-outline-primary' onClick={()=>{
                        setStep(1);
                    }}>이전</button>
                    <button className='btn btn-outline-primary ms-2' onClick={()=>{
                        setStep(3);
                    }}>다음</button>
                </div>
            </div>
        </div>
    )
}

function FindByTel(){
    return (
        <div className='mt-1'>
            <div className='d-flex flex-row justify-content-center mt-2'>
                <input type="text" placeholder='휴대전화번호'/>
                <button className='btn btn-outline-secondary ms-3'>인증번호 전송</button>
            </div>
            <input type="text" className='mt-2' placeholder='인증번호 입력'/>
        </div>
    )
}

function FindByEmail(){
    return (
        <div className='mt-1'>
            <div className='d-flex flex-row justify-content-center mt-2'>
                <input type="text" placeholder='이메일'/>
                <button className='btn btn-outline-secondary ms-3'>인증번호 전송</button>
            </div>
            <input type="text" className='mt-2' placeholder='인증번호 입력'/>
        </div>
    )
}

function FindPasswordStep3({setStep}){
    return (
        <div>
            <h3>비밀번호 재설정</h3>
            <h6>비밀번호 변경을 할 경우, 동일한 계정으로 자동 로그인이 되어 있는
                모든 기기에서 변경된 비밀번호로 다시 로그인을 하셔야 합니다</h6>
            <div>
                <h5>새 비밀번호</h5>
                <input type="text" placeholder='비밀번호'/>
                <h6>영문자, 숫자, 특수문자를 포함하여 8~32자로 설정해야 합니다</h6>
            </div>
            <div>
                <h5>새 비밀번호 재입력</h5>
                <input type="text" placeholder='비밀번호 재입력'/>
            </div>
            <div className='d-flex flex-row justify-content-center mt-3'>
                <button className='btn btn-outline-primary' onClick={()=>{
                    setStep(2);
                }}>이전</button>
                <button className='btn btn-outline-primary ms-2' onClick={()=>{

                }}>다음</button>
            </div>
        </div>
    )
}

export default FindPassword;