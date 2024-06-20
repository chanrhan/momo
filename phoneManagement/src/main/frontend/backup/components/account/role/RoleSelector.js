import {useNavigate} from "react-router-dom";

function RoleSelector(){
    const navigate = useNavigate();

    return (
        <div>
            <h4 className='debug-page'>Role Select Page</h4>
            <h3>모모에 오신 것을 환영합니다</h3>
            <h5>본인의 역할을 정확하게 선택해 주세요</h5>
            <div className='d-flex flex-row justify-content-center mt-5'>
                <div className='role-select-card' onClick={()=>{
                    navigate('staff')
                }}>
                    <p className='role-manager-lg mt-4'></p>
                    <h3 className='mt-lg-5'>직원</h3>
                    <h6>매장에서 일하고 있는 직원</h6>
                </div>
                <div className='role-select-card' onClick={()=>{
                    navigate('bm')
                }}>
                    <p className='role-bm-lg mt-4'></p>
                    <h3 className='mt-lg-5'>점장</h3>
                    <h6>매장을 맡고 계신 점장님</h6>
                </div>
                <div className='role-select-card' onClick={()=>{
                    navigate('reps')
                }}>
                    <p className='role-reps-lg mt-4'></p>
                    <h3 className='mt-lg-5'>대표</h3>
                    <h6>회사를 운영하고 계시는 대표님</h6>
                </div>
            </div>
        </div>
    )
}

export default RoleSelector;