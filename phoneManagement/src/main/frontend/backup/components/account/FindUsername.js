import {useEffect, useState} from "react";
import {ObjectUtils} from "../../utils/objectUtil";
import useInputField from "../../hook/useInputField";
import {useNavigate} from "react-router-dom";
import useApi from "../../hook/useApi";

function FindUsername(){
    const [findBy, setFindBy] = useState('tel');

    const inputField = useInputField(['name','tel']);
    const {publicApi} = useApi();
    const [authNumber, setAuthNumber] = useState(null);

    const [foundIds, setFoundIds] = useState([]);

    useEffect(()=>{
        inputField.clearOf([findBy, 'name'])
    },[findBy])

    const handleCheck = (by)=>{
        setFindBy(by);
    }

    const sendAuthNumber = ()=>{
        alert('인증번호가 성공적으로 발송되었습니다')
        setAuthNumber(123);
    }

    const submit = async ()=>{
        if(inputField.validateAll() && inputField.matchAuthNumber(authNumber)){
            await publicApi.findUser(findBy, {
                'name': inputField.input.name,
                [findBy]: inputField.input[findBy]
            }).then(({status,data})=>{
                if(status === 200){
                    console.log(data)
                    if(!ObjectUtils.isEmpty(data)){
                        setFoundIds(data);
                    }else{
                        inputField.handleServerError('입력하신 회원정보와 일치하는 아이디가 존재하지 않습니다');
                    }
                }
            })

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
                                    findBy === 'tel' ? <FindBy by='tel' error={inputField.error} handleInput={inputField.handleInput} sendAuthNumber={sendAuthNumber}/> : null
                                }
                            </div>
                            <div>
                                <input type="radio" name='find_form' onClick={()=>{
                                    handleCheck('email');
                                }}/> 이메일로 찾기
                                {
                                    findBy === 'email' ? <FindBy by='email' error={inputField.error} handleInput={inputField.handleInput} sendAuthNumber={sendAuthNumber}/> : null
                                }
                            </div>
                            {
                                inputField.serverError && <p className='text-danger'>{inputField.serverError}</p>
                            }
                            <div>
                                <button className='btn btn-outline-primary' onClick={submit}>다음</button>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

function FindBy({by, error, handleInput, sendAuthNumber}){
    const borderDangerIfError = (key)=>{
        return key ? 'border-danger' : 'border-dark'
    }

    return (
        <div className='mt-1'>
            <input type="text" className={`border ${borderDangerIfError(error.name)}`} name='name' placeholder='가입 시 등록한 이름' onChange={handleInput}/>
            {
                error.name && <p className='text-danger'>{error.name}</p>
            }
            <div className='d-flex flex-row justify-content-center align-items-center mt-2'>
                <input type="text" name={by} placeholder={by === 'tel'? '휴대전화번호':'이메일'} className={`border ${borderDangerIfError(error[by])}`} onChange={handleInput}/>
                <button className='btn btn-outline-secondary ms-3' onClick={sendAuthNumber}>인증번호 전송</button>
            </div>
            {
                error[by] && <p className='text-danger'>{error[by]}</p>
            }
            <input type="text" placeholder='인증번호 입력' name='auth_code' className={`mt-2 border ${borderDangerIfError(error.auth_code)}`} onChange={handleInput}/>
            {
                error.auth_code && <p className='text-danger'>{error.auth_code}</p>
            }
        </div>
    )
}
function Found({foundIds}){
    const navigate = useNavigate();
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
                <button className='btn btn-primary' onClick={()=>{
                    navigate('/account/login')
                }}>로그인</button>
                <button className='btn btn-outline-primary ms-3' onClick={()=>{
                    navigate('/account/find-password')
                }}>비밀번호 찾기</button>
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