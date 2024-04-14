import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateNickname} from "../api/UserApi";
import {getUserInfo} from "../api/AccountApi";
import {userActions} from "../store/slices/userSlice";

const nicknameByRole = {
    REPS: ['매니저','컨설턴트','CS','인턴'],
    BM: ['점장','실장','팀장','소사장'],
    STF: ['대표','관리자','팀장','점장'],
}

function NicknameSetting({name, role, close}){
    const dispatch = useDispatch();
    const {accessToken} = useSelector(state=>state.authReducer);
    const nicknameList = nicknameByRole[role];

    const [nickname, setNickname] = useState(nicknameList[0]);
    const [blockCustomInput, setBlockCustomInput] = useState(true);

    const handleSetNickname = (e)=>{
        const value = e.target.value;
        if(value === 'custom'){
            setBlockCustomInput(false)
            setNickname('')
            return;
        }else{
            setBlockCustomInput(true);
        }
        setNickname(value);
    }

    const handleCustomInput = (e)=>{
        setNickname(e.target.value);
    }

    const submit = async ()=>{
        const response = await updateNickname(nickname, accessToken);
        if(response.status === 200){
            updateUserInfo();
            alert("호칭이 변경되었습니다")
        }
    }

    const updateUserInfo = async ()=>{
        const response = await getUserInfo(accessToken);
        if(response.status === 200){
            dispatch(userActions.setUserInfo(response.data));
        }
    }

    return (
        <div className='d-flex flex-column align-items-center'>
            <h3>글을 작성할 때 표시되는 호칭을 설정해 주세요</h3>
            <div className='d-flex flex-row justify-content-center'>
                <h4 className='border border-1 p-3'><b>예시</b></h4>
                <h4 className='border border-1 p-3'>{name} <b className='text-primary'>{nickname}</b></h4>
            </div>
            <div className='border border-dark p-3 ' style={{width: '60%'}}>
                <div className='d-flex flex-row justify-content-center '>
                    <input type="radio" name='nickname' value={nicknameList[0]} onChange={handleSetNickname} defaultChecked/>
                    <h3 className='ms-2'>{nicknameList[0]}</h3>
                    <input className='ms-5' type="radio" name='nickname' value={nicknameList[1]} onChange={handleSetNickname}/>
                    <h3 className='ms-2'>{nicknameList[1]}</h3>
                </div>
                <div className='d-flex flex-row justify-content-center align-items-center mt-4'>
                    <input type="radio" name='nickname' value={nicknameList[2]} onChange={handleSetNickname}/>
                    <h3 className='ms-2'>{nicknameList[2]}</h3>
                    <input className='ms-5' type="radio" name='nickname' value={nicknameList[3]} onChange={handleSetNickname}/>
                    <h3 className='ms-2'>{nicknameList[3]}</h3>
                </div>
                <div className='mt-3 d-flex flex-row justify-content-center'>
                    <input type="radio" name='nickname' value='custom' onChange={handleSetNickname}/>
                    <input className='ms-3' type="text" placeholder='직접입력' disabled={blockCustomInput} onChange={handleCustomInput}/>
                </div>
            </div>
            <div className='d-flex flex-row justify-content-center mt-3'>
                <input type="checkbox"/>
                <h5 className='ms-2'>해당 호칭을 기본으로 설정</h5>
            </div>
            <div className='d-flex flex-row justify-content-center mt-5'>
                <button className='btn btn-outline-primary' name='setNickname' onClick={close}>취소</button>
                <button className='btn btn-primary ms-4' onClick={submit}>확인</button>
            </div>
        </div>
    )
}

export default NicknameSetting;