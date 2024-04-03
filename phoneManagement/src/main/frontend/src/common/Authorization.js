import {Navigate, useLocation} from "react-router-dom";
import checkAuthToken, {CheckToken} from "../auth/AuthUtils";
import {useEffect, useState} from "react";
import {authActions} from "../store/slices/authSlice";
import {requestRefreshToken} from "../api/Auth";
import {getCookieToken, removeCookieToken, setRefreshToken} from "../utils/Cookies";
import {useDispatch, useSelector} from "react-redux";

// const isAuthenticated = localStorage.getItem('accessToken');

export default function Authorization({redirectTo, children}){
    const location = useLocation();
    console.log(`location key : ${location.key}`)
    const {isAuth} = CheckToken(location.key);

    if(isAuth === 'Success'){
        return <>{children}</>
    }else if(isAuth === 'Loading') {
        return (
            <div>Loading..</div>
        )
    }else {
        return <Navigate to={redirectTo}/>;
    }
}
