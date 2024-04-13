import axiosInstance from "../utils/axiosInstance";
import {requestAPI, requestApiWithAccessToken} from "./ApiCommon";

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
    return await requestApiWithAccessToken
        .get('/api/v1/user/common/info', accessToken);
}

export const getRoleName = (role)=>{
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

export const validateBusinessNumber = async (data, accessToken)=>{
    return await requestApiWithAccessToken.post('/api/v1/account/validate/bno', data, accessToken);
}

export const findUsernameBy = async (findBy, data)=>{
    return await requestAPI.post(`/api/v1/public/find/id/${findBy}`, data, {});
}

export const existUserId = async(id)=>{
    return await requestAPI.get(`/api/v1/public/exist/id?value=${id}`,{});
}

export const matchUserId = async(findBy, data)=>{
    return await requestAPI.post(`/api/v1/public/match/${findBy}`, data, {});
}

export const getResetToken = async (data)=>{
    return await requestAPI.post('/api/v1/auth/token/reset-pwd', data, {});
}

// 비밀번호 재설정
// 보안**
export const resetPassword = async (data, accessToken)=>{
    return await requestAPI.post('/api/v1/auth/reset/password', data, {
        headers:{
            "RESET-TOKEN": accessToken
        }
    });
}


export const getTelEmailSecretly = async(id)=>{
    return await requestAPI.get(`/api/v1/public/get/tel-email/secret?id=${id}`,{});
}