import React, {useEffect} from "react";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import {Link, useNavigate} from "react-router-dom";
import {authActions, authReducer} from "../../store/slices/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {removeCookieToken} from "../../utils/Cookies";
import {userActions} from "../../store/slices/userSlice";
import {getUserInfo} from "../../api/Account";

function Header(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {accessToken} = useSelector(state=>state.authReducer);

    useEffect(()=>{
        const updateUserInfo = async ()=>{
            const {status, data} = await getUserInfo(accessToken);
            // console.log(userInfo)
            if(status === 200){
                dispatch(userActions.setUserInfo(data));
            }
        };
        if(accessToken != null){
            updateUserInfo();
        }
    }, [accessToken])

    const handleLogout = e=>{
        dispatch(authActions.delAccessToken());
        removeCookieToken();
        navigate('/');
    }

    return (
        <div>
            <h1>MOMO TEST PAGE</h1>
            <button className='btn btn-outline-dark' onClick={handleLogout}>LOGOUT</button>
            <div className='d-flex flex-row align-items-center justify-content-center'>
                <div >
                    <Link to='/service'>
                        <button className='btn btn-outline-primary'>모모</button>
                    </Link>

                    <Link to='/chat'>
                        <button className='btn btn-outline-primary'>팀 채팅</button>
                    </Link>
                </div>
                <div className='p-2'>
                    <input className='form-control' type="search" placeholder='이름, 전화번호, 식별번호로 검색해보세요'/>
                </div>
                <Link to='/notification'>
                    <button className='btn btn-outline-dark'>알림</button>
                </Link>
                <Link to='/profile'>
                    <button className='btn btn-outline-dark'>프로필</button>
                </Link>
            </div>
        </div>
    )
}


export default Header;