import {useState} from "react";
import {useSelector} from "react-redux";
import {ObjectUtils} from "../../../utils/objectUtil";
import {getCorpListForRoleDetail} from "../../../api/ShopApi";
import {useParams} from "react-router-dom";
import useApi from "../../../hook/useApi";

function SignupStaff(){
    const {shopApi} = useApi();
    const [searchResult, setSearchResult] = useState([]);
    const [keyword, setKeyword] = useState('');

    const handleKeyword = (e)=>{
        setKeyword(e.target.value);
    }

    const search = async ()=>{
        if(ObjectUtils.isEmpty(keyword)){
            return;
        }

        shopApi.getCorpListForRoleDetail({keyword}).then(({status,data})=>{
            if(status === 200){
                setSearchResult(data);
            }else{
                // console.error(response.json)
            }
        })

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

export default SignupStaff;