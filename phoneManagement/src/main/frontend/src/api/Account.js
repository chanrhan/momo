import axiosInstance from "../utils/axiosInstance";
import {requestAPI, requestAPIWithAccessToken} from "./ApiCommon";

const statusError = {
    status: false,
    json: {
        error: ["연결이 원활하지 않습니다. 잠시 후 다시 시도해 주세요"]
    }
}

export const signup = async (signupInput)=>{
    return await requestAPI.post('/api/v1/public/signup', signupInput);
}

export const login = async(user)=>{
    return await requestAPI.post('/api/v1/auth/login', user);
}

export const getUserInfo = async (accessToken)=>{
    return await requestAPIWithAccessToken
        .get('/api/v1/user/common/info', accessToken);
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