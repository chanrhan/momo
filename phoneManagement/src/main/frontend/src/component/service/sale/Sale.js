import {useEffect, useState} from "react";
import {getSaleList} from "../../../api/SaleApi";
import {useSelector} from "react-redux";

function Sale(){
    const [saleList, setSaleList] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [keydate, setKeydate] = useState('')
    const {accessToken} = useSelector(state=>state.authReducer);

    const getSaleListApi = async ()=>{
        let data = {
            keyword: keyword,
            actv_dt: keydate
        }
        const response = await getSaleList(data, accessToken);
        if(response.status === 200){
            console.log(response)
            setSaleList(response.data)
        }
    }

    useEffect(()=>{
        getSaleListApi();
    },[keyword, keydate]);

    const handleInputKeyword = (e)=>{
        setKeyword(e.target.value);
    }

    const handleInputKeydate = (e)=>{
        setKeydate(e.target.value);
    }

    return (
        <div>
            <p className='debug-page'>Sale Page</p>
            <h3 className='d-flex ms-2'>판매일보</h3>
            <div className='d-flex flex-row'>
                <p>총 100개</p>
                <div className='d-flex flex-row justify-content-center  ms-3'>
                    <p>개통년월</p>
                    <input type="date" className='ms-1' onChange={handleInputKeydate}/>
                </div>
                <div className='d-flex flex-row ms-3'>
                    <input type="text" placeholder='이름, 전화번호, 식별번호로 검색할 수 있습니다' onChange={handleInputKeyword}/>
                    <button className='btn btn-outline-secondary ms-3'>선택삭제</button>
                    <button className='btn btn-outline-secondary ms-4'>추가하기</button>
                    <button className='btn btn-outline-secondary ms-2'>정렬</button>
                </div>
            </div>
            <div>
                <table className='table'>
                    <thead>
                    <tr>
                        <th><input type='checkbox'/></th>
                        <th>이름</th>
                        <th>휴대폰</th>
                        <th>식별번호</th>
                        <th>모델명</th>
                        <th>담당 매니저</th>
                        <th>개통날짜</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        saleList.map(function (value, index){
                            return <tr key={index}>
                                <td><input type='checkbox'/></td>
                                <td>{value.cust_nm}</td>
                                <td>{value.cust_tel}</td>
                                <td>{value.cust_cd}</td>
                                <td>{value.ph_md}</td>
                                <td>{value.seller_nm}</td>
                                <td>{value.actv_dt}</td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Sale;