import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getProfilePicture} from "../api/FileUtils";
import {ShadowModal} from "../modal/ShadowModal";
import ChangeNicknameModal from "../user/ChangeNicknameModal";
import PfpSetting from "../user/PfpSetting";
import AddShopModal from "../shop/AddShopModal";
import ChangeShopModal from "../shop/ChangeShopModal";
import useModal from "../modal/useModal";
import {MODAL_TYPE} from "../modal/ModalType";

function Sidebar(){
    const modal = useModal();
    const navigate = useNavigate();
    const userInfo = useSelector(state=>state.userReducer);
    const {accessToken} = useSelector(state=>state.authReducer);

    const [pfp, setPfp] = useState('');

    const [popupOpen, setPopupOpen] = useState({
        setPfp: false,
        changeNickname: false,
        changeShop: false,
        addShop: false
    })

    useEffect(()=>{
        const getImage = async ()=>{
            const img = await getProfilePicture(userInfo.id, accessToken)
            setPfp(img);
        }
        getImage();
    },[]);



    const openModal = (type, props)=>{
        modal.openModal({type, props})
    }

    return (
        <div>
            <p className='debug-page'>Sidebar page</p>
            <div className='sidebar-lg' onClick={()=>{
                navigate('/service');
            }}></div>
            <div id='pfp p-2'>
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
            <div className='border border-dark p-2' onClick={()=>{
                openModal(MODAL_TYPE.Change_Shop);
            }}>
                <h4>{userInfo.corp_nm}</h4>
                <h5>{userInfo.shop_nm}</h5>
            </div>
            <div className='border border-dark d-flex flex-row p-1 justify-content-around' onClick={()=>{
                openModal(MODAL_TYPE.Change_Nickname, {
                    user: userInfo
                });
            }}>
                <h5 className='p-2 text-muted'>호칭</h5>
                <h4 className='p-2'>{userInfo.nickname}</h4>
            </div>
            <div className='d-flex flex-row p-2 justify-content-around'>
                {
                    userInfo.role === 'REPS' ? <button className='btn btn-outline-secondary p-2' onClick={()=>{
                            openModal(MODAL_TYPE.Add_Shop);
                        }}>매장 추가</button>
                        :null
                }

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
            {/*<ChangeNicknameModal open={popupOpen.changeNickname} user={userInfo} close={closeFunc.changeNickname}/>*/}
            {/*<AddShopModal open={popupOpen.addShop} close={closeFunc.addShop}/>*/}
            {/*<ChangeShopModal open={popupOpen.changeShop} close={closeFunc.changeShop}/>*/}
        </div>
    )
}

export default Sidebar;