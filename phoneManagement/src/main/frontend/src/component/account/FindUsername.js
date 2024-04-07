import {useState} from "react";

function FindUsername(){
    const [found, setFound] = useState(false);
    const [form, setForm] = useState(0);

    const handleCheck = (form)=>{
        setForm(form);
    }


    return (
        <div>
            {
                found ? <Found users={[1]}/> :
                    <div>
                        <p className='debug-page'>Find Username Page</p>
                        <h2>아이디 찾기</h2>
                        <h5>인증 수단을 선택하고 가입 시 등록한 회원정보를 입력해 주세요</h5>
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
                            <div>
                                <button className='btn btn-outline-primary'>다음</button>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

function FindByTel(){
    return (
        <div className='mt-1'>
            <input type="text" placeholder='가입 시 등록한 이름'/>
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
            <input type="text" placeholder='가입 시 등록한 이름'/>
            <div className='d-flex flex-row justify-content-center mt-2'>
                <input type="text" placeholder='이메일'/>
                <button className='btn btn-outline-secondary ms-3'>인증번호 전송</button>
            </div>
            <input type="text" className='mt-2' placeholder='인증번호 입력'/>
        </div>
    )
}

function Found({users}){

    return (
        <div>
            <h3>아이디 확인</h3>
            <h6>회원님의 정보와 일치하는 아이디 목록입니다</h6>
            <div className='d-flex justify-content-center'>
                {
                    users.map(function (value, index){
                        return <FoundUser key={index} user={value}/>
                    })
                }
            </div>
            <div className='d-flex flex-row mt-3 justify-content-center'>
                <button className='btn btn-primary'>로그인</button>
                <button className='btn btn-outline-primary ms-3'>회원가입</button>
            </div>
        </div>
    )
}

function FoundUser({user}){
    return (
        <div className='border border-secondary d-flex flex-row' style={{width: '500px'}}>
            <input type="radio" name='user_choice' className='ms-4 mt-2'/>
            <div className='ms-3 mt-1'>
                <h5>회원 아이디: {user.name}</h5>
                <h6 className='text-secondary'>(가입일: {user.regi_dt})</h6>
            </div>
        </div>
    )
}

export default FindUsername;