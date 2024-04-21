import useValidation from "../utils/useValidation";
import useApi from "../utils/useApi";
import {useSelector} from "react-redux";
import useUserInfo from "../utils/useUserInfo";
import { CiLock } from "react-icons/ci";
import useModal from "../utils/useModal";
import ModalTest from "../test/ModalTest";
import {ModalType} from "../modal/ModalType";

function Profile(){
    const val = useValidation();
    const modal = useModal();
    const {userApi} = useApi();
    const {user} = useUserInfo();

    const openPasswordModifyModal = ()=>{
        modal.openModal(ModalType.LAYER.Update_Password)
    }


    return (
        <div className='ms-4 d-flex flex-column'>
            <h3 className='debug-page'>Profile Page</h3>
            <div>
                <h3>내 정보 설정</h3>
                <h5>아이디/비밀번호 찾기 등 본인확인이 필요한 경우 사용할 정보이므로 정확하게 입력해 주세요</h5>
                <div className='mt-5'>
                    <h4><b>기본 정보</b></h4>
                    <div>

                    </div>
                    <div className='d-flex flex-row justify-content-center align-items-baseline mt-3'>
                        <p>아이디</p>
                        <input className='ms-3' name='id' type="text" value={user.id} placeholder='아이디'/>
                    </div>
                    <div className='d-flex flex-row justify-content-center align-items-baseline mt-3'>
                        <p>이름</p>
                        <input className='ms-3' name='name' type="text" value={user.name} placeholder='이름'/>
                    </div>
                    <div className='d-flex flex-row justify-content-center align-items-baseline mt-3'>
                        <p>생년월일</p>
                        <input className='ms-3' name='birth' type="date"  placeholder='생년월일'/>
                    </div>
                    <div className='d-flex flex-row justify-content-center align-items-baseline mt-3'>
                        <p>휴대전화번호</p>
                        <input className='ms-3' name='tel' type="text" value={user.tel} placeholder='휴대전화번호'/>
                    </div>
                    <div className='d-flex flex-row justify-content-center align-items-baseline mt-3'>
                        <p>전화번호</p>
                        <input className='ms-3' name='tel2' type="text"  placeholder='전화번호'/>
                    </div>
                    <div className='d-flex flex-row justify-content-center align-items-baseline mt-3'>
                        <p>입사일</p>
                        <input className='ms-3' name='regi_dt' type="text"  placeholder='입사일'/>
                    </div>
                    <div className='d-flex flex-row justify-content-center align-items-baseline mt-3'>
                        <p>MBTI</p>
                        <input className='ms-3' name='mbti' type="text" placeholder='MBTI'/>
                    </div>
                    <div className='d-flex flex-row justify-content-center align-items-baseline mt-3'>
                        <p>비밀번호</p>
                        {/*<input className='ms-3' name='pwd' type="text" placeholder='비밀번호'/>*/}
                        <CiLock/>
                        <button className='ms-5 btn btn-outline-danger' onClick={openPasswordModifyModal}>비밀번호 재설정</button>
                    </div>
                </div>
                <div>
                    <button className='btn btn-outline-primary'>저장</button>
                </div>
            </div>
        </div>
    )
}

export default Profile;