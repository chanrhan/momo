import {useState} from "react";
import {validateBusinessNumber} from "../../api/AccountApi";
import {useSelector} from "react-redux";

function SignupReps(){
    const {accessToken} = useSelector(state=>state.authReducer);
    const [bsInput, setBsInput] = useState({});
    const [bno, setBno] = useState([
        '','',''
    ]);

    const handleBsInput = (e)=>{
        setBsInput(prev=>(
            {
                ...prev, [e.target.name]: e.target.value
            }
        ))
    }

    const handleBnoInput = (e)=>{
        let copy = [...bno];
        copy[e.target.getAttribute('index')] = e.target.value;
        setBno(copy);
    }

    const validateBno = async ()=>{
        const data = {
            ...bsInput,
            'b_no': bno[0]+bno[1]+bno[2],
            'p_nm2': ''
        }
        const response = await validateBusinessNumber(data, accessToken);
        if(response.status === 200){
            console.table(response.data)
            alert("성공적으로 인증되었습니다.")
        }
    }

    return (
        <div>
            <h3>사업자 등록</h3>
            <h5>법인명과 사업자 등록번호 모두 정확하게 입력해주세요</h5>
            <div className='mt-5'>
                {/*<h4>사업자 정보</h4>*/}
                <input type="text" name='p_nm' placeholder='사업자명' onChange={handleBsInput}/>
                <br/>
                <input type="text" name='start_dt' placeholder='개업연월' onChange={handleBsInput}/>
            </div>
            <div className='mt-4'>
                <h4>사업자 등록 번호</h4>
                <div className='d-flex flex-row justify-content-center align-items-center'>
                    <input type="text" index='0' className='ms-2 me-2' style={{width: '70px'}} onChange={handleBnoInput}/>-
                    <input type="text" index='1' className='ms-2 me-2' style={{width: '70px'}} onChange={handleBnoInput}/>-
                    <input type="text" index='2' className='ms-2 me-2' style={{width: '70px'}} onChange={handleBnoInput}/>
                    <button className='btn btn-outline-secondary' onClick={validateBno}>사업자 인증</button>
                </div>
                <div className='mt-5'>
                    <button className='btn btn-outline-primary' >다음</button>
                </div>
            </div>
        </div>
    )
}

export default SignupReps;