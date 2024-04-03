import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCookieToken, removeCookieToken, setRefreshToken} from "../utils/Cookies";
import {authActions} from "../store/slices/authSlice";
import {requestRefreshToken} from "../api/Auth";

//
export function CheckToken(key){
    const [isAuth, setIsAuth] = useState('Loading');
    const {authenticated, accessToken, expireTime} = useSelector(state=>state.authReducer);
    const refreshToken = getCookieToken();
    const dispatch = useDispatch();

    useEffect(()=>{
        console.log(`Check Token -> ${key}`)
        console.log(`authenticated ${authenticated}, expireTime: ${expireTime}`)
        const checkAuthToken = async ()=> {
            console.log(`checkAuthToken : ${refreshToken}`)
            if (refreshToken === undefined) {
                dispatch(authActions.delAccessToken());
                setIsAuth('Failed');
            } else {
                // setIsAuth('Success');

                if (authenticated && new Date().getTime() < expireTime) {
                    setIsAuth('Success');
                } else {
                    const response = await requestRefreshToken(refreshToken);
                    console.log(`refresh response: ${response}`)

                    if (response.status === 200) {
                        // const token = response.jwtToken.access_token;
                        console.log(`refresh token : ${response.jwtToken}`)
                        dispatch(authActions.setAccessToken(response.jwtToken.access_token))
                        setRefreshToken(response.jwtToken.refresh_token);
                        setIsAuth('Success')

                    } else {
                        dispatch(authActions.delAccessToken());
                        console.log(`refresh token error : ${response.jwtToken}`)
                        removeCookieToken();
                        setIsAuth('Failed');
                    }
                }
            }
        };
        checkAuthToken();
    }, [refreshToken, dispatch, key]);

    return {
        isAuth
    }
}