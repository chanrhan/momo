import {useNavigate, useParams} from "react-router-dom";
import NotFound from "../../common/NotFound";
import {useState} from "react";
import {getCorpListForRoleDetail} from "../../../api/ShopApi";
import {useSelector} from "react-redux";
import {isEmpty} from "../../../utils/objectUtil";

function RoleDetail(){
    const navigate = useNavigate();
    const {role} = useParams();

    return (
        <div>
            <h3 className='debug-page'>Role Detail Page</h3>
            <RoleDetailSelector role={role}/>
        </div>
    )
}

function RoleDetailSelector({role}){
    switch (role){
        case 'staff':
            return <StaffDetail/>;
        case 'bm':
            return <StaffDetail/>;
        case 'reps':
            return <RepsDetail/>;
        default:
            return <NotFound/>;

    }
}

function StaffDetail(){
    const [searchResult, setSearchResult] = useState([]);
    const [keyword, setKeyword] = useState('');
    const {accessToken} = useSelector(state=>state.authReducer);

    const handleKeyword = (e)=>{
        setKeyword(e.target.value);
    }

    const search = async ()=>{
        if(isEmpty(keyword)){
            return;
        }

        const response = await getCorpListForRoleDetail(keyword, accessToken);
        console.log(response)
        if(response.status === 200){
            setSearchResult(response.data);
        }else{
            console.error(response.json)
        }
    }

    return (
        <div>
            <h3>회사 찾기</h3>
            <h5>지역을 먼저 선택하신 후, 회사명을 검색하여 소속되어 있는 회사를 찾을 수 있습니다.</h5>
            <div className='mt-5'>
                <h4>회사 검색</h4>
                <div className='d-flex flex-row justify-content-center'>
                    <input type="text" style={{width: '330px'}} onChange={handleKeyword} placeholder='회사명, 회사 코드 검색'/>
                    <button className='btn btn-outline-secondary ms-2' onClick={search}>검색</button>
                </div>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <p></p>
                    {
                        searchResult.map(function (value, index){
                            return <ShopSearchResult key={index} corp={value}/>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

function ShopSearchResult({corp}){
    const {role} = useParams();

    const selectShop = ()=>{

    }

    return (
        <div className='border border-secondary d-flex flex-row mt-1 align-items-center' style={{width: '400px'}}>
            <div className='ms-2' style={{width: '120px'}}>
                <h5 className='mt-2'>회사명</h5>
                <h6 className='text-secondary'>{corp.corp_nm}</h6>
            </div>
            <div className='ms-2'>
                <h5 className='mt-2'>회사 코드</h5>
                <h6 className='text-secondary'>{corp.corp_id}</h6>
            </div>
            <div className='ms-5 float-end'>
                <button className='btn btn-outline-secondary' onClick={selectShop}>승인 요청</button>
            </div>
        </div>
    )
}

function RepsDetail(){
    return (
        <div>
            <h3>사업자 등록</h3>
            <h5>법인명과 사업자 등록번호 모두 정확하게 입력해주세요</h5>
            <div className='mt-5'>
                <h4>사업자 상호명</h4>
                <input type="text" placeholder='법인명(단체명)'/>
            </div>
            <div className='mt-4'>
                <h4>사업자 등록 번호</h4>
                <div className='d-flex flex-row justify-content-center'>
                    <input type="text" className='ms-2 me-2' style={{width: '70px'}}/>-
                    <input type="text" className='ms-2 me-2' style={{width: '70px'}}/>-
                    <input type="text" className='ms-2 me-2' style={{width: '70px'}}/>
                    <button className='btn btn-outline-secondary'>사업자 인증</button>
                </div>
                <div className='mt-5'>
                    <button className='btn btn-outline-primary'>다음</button>
                </div>
            </div>
        </div>
    )
}



export default RoleDetail;