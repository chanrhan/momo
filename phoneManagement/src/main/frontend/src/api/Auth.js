import axiosInstance from "../utils/axiosInstance";
import {useSelector} from "react-redux";

const TIME_OUT = 300 * 1000;

const statusError = {
    status: false,
    json: {
        error: ["연결이 원활하지 않습니다. 잠시 후 다시 시도해 주세요"]
    }
}

// React Function Component 에서만 useState, useEffect, useSelector 등을 사용할 수 있음
// const getAccessToken = ()=>{
//     let {accessToken} = useSelector(state=>state.authReducer);
//     return accessToken;
// }


export const requestRefreshToken = async (refreshToken)=>{
    const option = {
        headers: {
            'X-REFRESH-TOKEN': refreshToken
        }
    }
    // console.log(`requestToken refresh: ${option}`)
    const data = await axiosInstance.post('/api/v1/auth/refresh',{}, option)
        .catch(()=>{
            return statusError;
        })

    if(parseInt(Number(data.status) / 100) === 2){
        const status = data.status;

        const jwtToken = {
            access_token: data.headers.get('authorization'),
            refresh_token: data.headers.get('refreshtoken')
        }

        return {
            status,
            jwtToken
        }
    }else{
        return statusError;
    }

}

export const loginUser = async(user)=>{
    let {username, password} = user;
    const response = await axiosInstance.post('/api/v1/auth/login', {
        username: username,
        password: password
    }).catch(()=>{
        return statusError;
    })

    const status = response.status;
    if(parseInt(Number(status) / 100) === 2){
        // console.log(`response.headers.authorization : ${data.headers.get('authorization')}`)

        const jwtToken = {
            access_token: response.headers.get('authorization'),
            refresh_token: response.headers.get('refreshtoken')
        }

        return {
            status,
            jwtToken
        }
    }else{
        return statusError;
    }
}

export const getUserInfo = async (accessToken)=>{
    const option = {
        headers: {
            "X-ACCESS-TOKEN": accessToken
        }
    };
    const response = await axiosInstance.get('/api/v1/user/common/info',option)
        .catch(()=>{
            return statusError;
        });

    // console.log(response);

    const status = response.status;
    if(parseInt(Number(status) / 100) === 2){
        const data = response.data;
        const userInfo = {
            name : data.name,
            role : getRoleName(data.role),
            nickname : data.nickname,
            pfp : data.pfp,
            corp_nm : data.corp_nm,
            shop_nm : data.shop_nm
        }

        return {
            status,
            userInfo
        }
    }else{
        return statusError;
    }
}

function getRoleName(role){
    switch (role){
        case 'ADMIN':
            return "관리자"
        case 'REPS':
            return "대표"
        case 'BM':
            return "점장"
        case 'STF':
            return "직원"
    }
}