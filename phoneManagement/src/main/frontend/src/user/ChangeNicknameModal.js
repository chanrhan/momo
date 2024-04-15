import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateNickname} from "../api/UserApi";
import {getUserInfo} from "../api/AccountApi";
import {userActions} from "../store/slices/userSlice";
import {ShadowModal} from "../modal/ShadowModal";
import {ObjectUtils} from "../utils/objectUtil";
import useModal from "../modal/useModal";
import {MODAL_TYPE} from "../modal/ModalType";

const nicknameByRole = {
    REPS: ['매니저','컨설턴트','CS','인턴'],
    BM: ['점장','실장','팀장','소사장'],
    STF: ['대표','관리자','팀장','점장'],
}

function ChangeNicknameModal({user}){
    const modal = useModal();
    const dispatch = useDispatch();
    const {accessToken} = useSelector(state=>state.authReducer);

    const [nicknameList, setNicknameList] = useState([]);
    const [nickname, setNickname] = useState(null);
    const [defaultChecked, setDefaultChecked] = useState([
        true,false,false,false, false
    ]);
    const [customInput, setCustomInput] = useState('');
    const [blockCustomInput, setBlockCustomInput] = useState(true);

    useEffect(()=>{
        if(!ObjectUtils.isEmptyMap(user)){
            setNicknameList(nicknameByRole[user.role]);
        }
    },[user])

    useEffect(()=>{
        if(ObjectUtils.isEmpty(nicknameList)){
           return;
        }
        if(ObjectUtils.isEmpty(user.nickname)){
            setNickname(nicknameList[0])
        }else{
            setNickname(user.nickname)
            const idx = nicknameList.indexOf(user.nickname);
            let copy = [...defaultChecked];
            if(idx !== -1){
                ObjectUtils.toggleOf(copy, idx);
            }else{
                ObjectUtils.toggleOf(copy, 4);
                setBlockCustomInput(false);
                setCustomInput(user.nickname)
            }

            setDefaultChecked(copy);
        }
    }, [nicknameList])

    const handleSetNickname = (e)=>{
        const value = e.target.value;
        if(value === 'custom'){
            setBlockCustomInput(false)
            setNickname(customInput)
            return;
        }else{
            setBlockCustomInput(true);
        }
        setNickname(value);
    }

    const handleCustomInput = (e)=>{
        setNickname(e.target.value)
        setCustomInput(e.target.value);
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

    const close = ()=>{
        modal.closeModal(MODAL_TYPE.Change_Nickname);
    }

    return (
        <ShadowModal width='60%' height='70%'>
            <div className='d-flex flex-column align-items-center mt-5'>
                <h3>글을 작성할 때 표시되는 호칭을 설정해 주세요</h3>
                <div className='d-flex flex-row justify-content-center'>
                    <h4 className='border border-1 p-3'><b>예시</b></h4>
                    <h4 className='border border-1 p-3'>{user.name} <b className='text-primary'>{nickname}</b></h4>
                </div>
                <div className='border border-dark p-3 ' style={{width: '60%'}}>
                    <div className='d-flex flex-row justify-content-center '>
                        <input type="radio" name='nickname' value={nicknameList[0]} onChange={handleSetNickname} checked={defaultChecked[0]}/>
                        <h3 className='ms-2'>{nicknameList[0]}</h3>
                        <input className='ms-5' type="radio" name='nickname' value={nicknameList[1]} onChange={handleSetNickname} checked={defaultChecked[1]}/>
                        <h3 className='ms-2'>{nicknameList[1]}</h3>
                    </div>
                    <div className='d-flex flex-row justify-content-center align-items-center mt-4'>
                        <input type="radio" name='nickname' value={nicknameList[2]} onChange={handleSetNickname} checked={defaultChecked[2]}/>
                        <h3 className='ms-2'>{nicknameList[2]}</h3>
                        <input className='ms-5' type="radio" name='nickname' value={nicknameList[3]} onChange={handleSetNickname} checked={defaultChecked[3]}/>
                        <h3 className='ms-2'>{nicknameList[3]}</h3>
                    </div>
                    <div className='mt-3 d-flex flex-row justify-content-center'>
                        <input type="radio" name='nickname' value='custom' onChange={handleSetNickname} checked={defaultChecked[4]}/>
                        <input className='ms-3' type="text" value={customInput} placeholder='직접입력' disabled={blockCustomInput} onChange={handleCustomInput} />
                    </div>
                </div>
                <div className='d-flex flex-row justify-content-center mt-5'>
                    <button className='btn btn-outline-primary' onClick={close}>취소</button>
                    <button className='btn btn-primary ms-4' onClick={submit}>확인</button>
                </div>
            </div>
        </ShadowModal>
    )
}

export default ChangeNicknameModal;