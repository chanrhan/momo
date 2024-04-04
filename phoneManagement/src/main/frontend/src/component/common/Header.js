import React, {useEffect} from "react";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import {Link, useNavigate} from "react-router-dom";
import {authActions, authReducer} from "../../store/slices/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {removeCookieToken} from "../../utils/Cookies";
import {getUserInfo} from "../../api/Auth";
import {userActions} from "../../store/slices/userSlice";

function Header(){
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const userInfo = useSelector(state=>state.userReducer);
    const {accessToken} = useSelector(state=>state.authReducer);

    useEffect(()=>{
        const updateUserInfo = async ()=>{
            const {status, userInfo} = await getUserInfo(accessToken);
            // console.log(userInfo)
            if(status === 200){
                dispatch(userActions.setUserInfo(userInfo));
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
            <h1>
                <Link to='/'>MOMO TEST PAGE</Link>
            </h1>
            <button onClick={handleLogout}>LOGOUT</button>
            <p>{userInfo.name}</p>
            <p>{userInfo.role}</p>
        </div>
    )
}


export default Header;