import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getProfilePicture} from "../api/FileUtils";
import {PopupModal} from "../modal/PopupModal";
import NicknameSetting from "../user/NicknameSetting";
import PfpSetting from "../user/PfpSetting";

function Sidebar(){
    const navigate = useNavigate();
    const userInfo = useSelector(state=>state.userReducer);
    const {accessToken} = useSelector(state=>state.authReducer);

    const [pfp, setPfp] = useState('');

    const [popupOpen, setPopupOpen] = useState({
        setPfp: false,
        setNickname: false,
        setShop: false,
        addShop: false
    })

    useEffect(()=>{
        const getImage = async ()=>{
            const img = await getProfilePicture(userInfo.id, accessToken)
            setPfp(img);
        }
        getImage();
    },[]);

    const openPopup = (popupName)=>{
        setPopupOpen(prev=>({
            ...prev,
            [popupName]: true
        }))
    }

    const closePopup = (e)=>{
        setPopupOpen(prev=>({
            ...prev,
            [e.target.name]: false
        }))
    }

    return (
        <div>
            <p className='debug-page'>Sidebar page</p>
            <div className='sidebar-lg' onClick={()=>{
                navigate('/service');
            }}></div>
            <div id='pfp p-2' onClick={()=>{
                openPopup('setPfp')
            }}>
                <img src={pfp} alt='pfp'/>
            </div>
            <div>
                <h4>{userInfo.name}</h4>
                {
                    userInfo.role === 'ADMIN' ? (
                        <Link to='/admin'>
                            <button className='btn btn-outline-danger'>관리자 페이지</button>
                        </Link>
                    ) : null
                }
            </div>
            <div className='border border-dark p-2'>
                <p>{userInfo.corp_nm}</p>
                <p>{userInfo.shop_nm}</p>
            </div>
            <div className='border border-dark d-flex flex-row p-1 justify-content-around' onClick={()=>{
                openPopup('setNickname')
            }}>
                <h5 className='p-2 text-muted'>호칭</h5>
                <h4 className='p-2'>{userInfo.nickname}</h4>
            </div>
            <div className='d-flex flex-row p-2 justify-content-around'>
                <button className='btn btn-outline-secondary p-2'>매장 추가</button>
                <button className='btn btn-outline-secondary p-2'>초대하기</button>
            </div>
            <hr/>
            <div className='d-flex flex-column'>
                <Link to='/service/sale'>
                    <button className='btn btn-lg'><h3>판매일보</h3></button>
                </Link>
                <Link to='/service/manage-customer/card'>
                    <button className='btn btn-lg'><h3>고객 관리</h3></button>
                </Link>
                <Link to='/service/reserve-msg/card'>
                    <button className='btn btn-lg'><h3>예약전송함</h3></button>
                </Link>
                <Link to='/service/graph'>
                    <button className='btn btn-lg'><h3>그래프</h3></button>
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
            <PopupModal name='setNickname' open={popupOpen.setNickname}>
                <NicknameSetting name={userInfo.name} role={userInfo.role} close={closePopup}/>
            </PopupModal>
            <PopupModal name='setPfp' open={popupOpen.setPfp}>
                <PfpSetting name={userInfo.name} role={userInfo.role} close={closePopup}/>
            </PopupModal>
        </div>
    )
}

export default Sidebar;