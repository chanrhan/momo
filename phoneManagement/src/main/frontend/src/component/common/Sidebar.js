import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getProfilePicture} from "../../api/FileUtils";

function Sidebar(){
    const userInfo = useSelector(state=>state.userReducer);
    const {accessToken} = useSelector(state=>state.authReducer);

    const [pfp, setPfp] = useState('');

    useEffect(()=>{
        const getImage = async ()=>{
            const img = await getProfilePicture(userInfo.id, accessToken)
            setPfp(img);
        }
        getImage();
    },[])

    return (
        <div>
            <p className='debug-page'>Sidebar page</p>
            <div id='pfp p-2'>
                <img src={pfp} alt='pfp'/>
            </div>
            <div>
                <h4>{userInfo.name}</h4>
            </div>
            <div className='border border-dark p-2'>
                <p>{userInfo.corp_nm}</p>
                <p>{userInfo.shop_nm}</p>
            </div>
            <div className='border border-dark d-flex flex-row p-1'>
                <p className='p-2 text-muted'>호칭</p>
                <p className='p-2'>{userInfo.nickname}</p>
            </div>
            <div className='d-flex flex-row p-2'>
                <button className='btn btn-outline-secondary p-2'>매장 추가</button>
                <button className='btn btn-outline-secondary p-2'>초대하기</button>
            </div>
            <hr/>
            <div className='d-flex flex-column'>
                <Link to='/service/sale'>
                    <button className='btn btn-lg'>판매일보</button>
                </Link>
                <Link to='/service/manage-customer/card'>
                    <button className='btn btn-lg'>고객 관리</button>
                </Link>
                <Link to='/service/reserve-msg/card'>
                    <button className='btn btn-lg'>예약전송함</button>
                </Link>
                <Link to='/service/graph'>
                    <button className='btn btn-lg'>그래프</button>
                </Link>
            </div>
            <div id='online-users' className='border border-dark'>
                온라인 유저 표시
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        </div>
    )
}

export default Sidebar;