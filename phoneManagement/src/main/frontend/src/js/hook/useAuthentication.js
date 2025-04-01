import useApi from "./useApi";
import {removeRefreshToken, setRefreshToken} from "../utils/Cookies";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../store/slices/authSlice";
import {ModalType} from "../common/modal/ModalType";
import {useEffect} from "react";
import {userActions} from "../store/slices/userSlice";
import {HttpStatusCode} from "axios";

export const useAuthentication = ()=>{
    const {publicApi} = useApi();
    const dispatch = useDispatch();

    const login = async (data)=>{
        let rst = false;

        const encodedPassword = encodePassword((data.password));

        await publicApi.login({
            ...data,
            // password: encodedPassword
        }).then((res)=>{
            rst = (res.status === HttpStatusCode.Ok)
            // return;
            // if(res.status === 200){
            //     if(res.data){
            //
            //     }
            //     const accessToken = res.headers.get('authorization')
            //     const refreshtoken = res.headers.get('refreshtoken');
            //     const refreshexpiretime = res.headers.get('refreshexpiretime');
            //     // console.log(`r e t : ${refreshexpiretime / 1000 / 60}`)
            //     dispatch(authActions.setAccessToken(accessToken));
            //     setRefreshToken(refreshtoken, refreshexpiretime);
            // }
            const accessToken = res.headers.get('authorization')
            const refreshtoken = res.headers.get('refreshtoken');
            const refreshexpiretime = res.headers.get('refreshexpiretime');
            dispatch(authActions.setAccessToken(accessToken));
            setRefreshToken(refreshtoken, refreshexpiretime);
        }).catch(e=>{
            rst = false;
        })
        // console.log(`rst: ${rst}`)
        return rst;
    }

    const encodePassword = async (pwd: string)=>{
        return pwd;
    }

    const logout = ()=>{
        const refreshToken = localStorage.getItem('refresh_token')

        console.log('logout')
        localStorage.removeItem('authorization') // 웹페이지 Accesstoekn 쿠키 제거
        if(refreshToken){
            publicApi.logout(refreshToken).then(({status,data})=>{
                removeRefreshToken() // 웹페이지 Refresh 쿠키 제거
            })
        }
        dispatch(authActions.clear()) // 리액트 내장 변수 제거
        dispatch(userActions.deleteUserInfo())
    }


    return {
        login,
        logout
    }
}