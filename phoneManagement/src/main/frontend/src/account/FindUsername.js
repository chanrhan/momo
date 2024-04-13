import {useEffect, useState} from "react";
import {ObjectUtils} from "../utils/objectUtil";
import {emailRegex, telRegex} from "../utils/regex";
import {validateUtils} from "../utils/validateUtils";
import {findUsernameBy} from "../api/AccountApi";
import {useSelector} from "react-redux";

function FindUsername(){
    const [found, setFound] = useState(false);
    const [findBy, setFindBy] = useState('tel');

    const [authNumber, setAuthNumber] = useState(null);

    const [foundIds, setFoundIds] = useState([]);

    const [findInput, setFindInput] = useState({
        email: null,
        tel: null,
        name: null
    })
    const [authInput, setAuthInput] = useState(null);

    const [error, setError] = useState({
        name: null,
        email: null,
        tel: null,
        auth_code: false
    })

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
                [key]: value
            }
        ))
    }

    const handleError = (key, msg)=>{
        setError(prev=>(
            {
                ...prev,
                [key]: msg
            }
        ));
    }

    const handleAuthInput = (e)=>{
        setAuthInput(true);
    }


    const handleCheck = (by)=>{
        setFindBy(by);
    }

    const sendAuthNumber = ()=>{
        setAuthNumber(123);
    }

    const validateBeforeSubmit = ()=>{
        const vn = validateUtils.validate('name',findInput.name, handleError);
        const vb = validateUtils.validate(findBy, findInput[findBy], handleError);

        if(vn && vb && authInput){
            requestFindId();
        }
    }

    const requestFindId = async ()=>{
        const data = {
            'name': findInput.name,
            [findBy]: findInput[findBy]
        }
        const response = await findUsernameBy(findBy, data);
        if(response.status === 200){
            setFoundIds(response.data);
        }
    }


    return (
        <div>
            {
                !ObjectUtils.isEmpty(foundIds) ? <Found foundIds={foundIds}/> :
                    <div>
                        <p className='debug-page'>Find Username Page</p>
                        <h2>아이디 찾기</h2>
                        <h5>인증 수단을 선택하고 가입 시 등록한 회원정보를 입력해 주세요</h5>
                        <div className='d-flex flex-column justify-content-center'>
                            <div>
                                <input type="radio" name='find_form' defaultChecked={true} onClick={()=>{
                                    handleCheck('tel');
                                }}/> 휴대전화번호로 찾기
                                {
                                    findBy === 'tel' ? <FindBy by='tel' error={error} handleFindInput={handleFindInput} sendAuthNumber={sendAuthNumber} handleAuthInput={handleAuthInput}/> : null
                                }
                            </div>
                            <div>
                                <input type="radio" name='find_form' onClick={()=>{
                                    handleCheck('email');
                                }}/> 이메일로 찾기
                                {
                                    findBy === 'email' ? <FindBy by='email' error={error} handleFindInput={handleFindInput} sendAuthNumber={sendAuthNumber} handleAuthInput={handleAuthInput}/> : null
                                }
                            </div>
                            <div>
                                <button className='btn btn-outline-primary' onClick={validateBeforeSubmit}>다음</button>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

function FindBy({by, error, handleFindInput, handleAuthInput, sendAuthNumber}){
    const borderDangerIfError = (key)=>{
        return key ? 'border-danger' : 'border-dark'
    }

    return (
        <div className='mt-1'>
            <input type="text" className={`border ${borderDangerIfError(error.name)}`} name='name' placeholder='가입 시 등록한 이름' onChange={handleFindInput}/>
            {
                error.name && <p className='text-danger'>{error.name}</p>
            }
            <div className='d-flex flex-row justify-content-center align-items-center mt-2'>
                <input type="text" name={by} placeholder={by === 'tel'? '휴대전화번호':'이메일'} className={`border ${borderDangerIfError(error[by])}`} onChange={handleFindInput}/>
                <button className='btn btn-outline-secondary ms-3' onClick={sendAuthNumber}>인증번호 전송</button>
            </div>
            {
                error[by] && <p className='text-danger'>{error[by]}</p>
            }
            <input type="text" placeholder='인증번호 입력' className={`mt-2 border ${borderDangerIfError(error.auth_code)}`} onChange={handleAuthInput}/>
            {
                error.auth_code && <p className='text-danger'>{error.auth_code}</p>
            }
        </div>
    )
}
function Found({foundIds}){

    return (
        <div>
            <h3>아이디 확인</h3>
            <h6>회원님의 정보와 일치하는 아이디 목록입니다</h6>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                {
                    foundIds.map(function (value, index){
                        return <FoundUser key={index} user={value}/>
                    })
                }
            </div>
            <div className='d-flex flex-row mt-3 justify-content-center'>
                <button className='btn btn-primary'>로그인</button>
                <button className='btn btn-outline-primary ms-3'>비밀번호 찾기</button>
            </div>
        </div>
    )
}

function FoundUser({user}){
    return (
        <div className='border border-secondary d-flex flex-row mt-2' style={{width: '500px'}}>
            <input type="radio" name='user_choice' className='ms-4 mt-2'/>
            <div className='ms-3 mt-1 d-flex flex-column'>
                <h5 className='align-self-start'><b>{user.id}</b></h5>
                <h6 className='text-secondary'>(가입일: {user.regi_dt})</h6>
            </div>
        </div>
    )
}

export default FindUsername;