import {requestAPI, requestApiWithAccessToken} from "./ApiCommon";


function AccountApi(accessToken){
    return {
        login: async (data)=>{
          return await requestAPI.post('/api/v1/auth/login',data);
        },
        signup : async (data)=>{
            return await requestAPI.post('/api/v1/public/signup', data);
        },

        validateBusinessNumber : async (data)=>{
            return await requestApiWithAccessToken.post('/api/v1/account/validate/bno', data, accessToken);
        },
        findUsernameBy : async (findBy, data)=>{
            return await requestAPI.post(`/api/v1/public/find/id/${findBy}`, data, {});
        },
        existUserId : async(id)=>{
            return await requestAPI.get(`/api/v1/public/exist/id?value=${id}`,{});
        },
        matchUserId : async(findBy, data)=>{
            return await requestAPI.post(`/api/v1/public/match/${findBy}`, data, {});
        },
        getResetToken : async (data)=>{
            return await requestAPI.post('/api/v1/auth/token/reset-pwd', data, {});
        },
        // 비밀번호 재설정
        // 보안**
        resetPassword : async (data)=>{
            return await requestAPI.post('/api/v1/auth/reset/password', data, {
                headers:{
                    "RESET-TOKEN": accessToken
                }
            });
        },
        fetchProtectedTelAndEmail : async(id)=>{
            return await requestAPI.get(`/api/v1/public/fetch/tel-email/protected?id=${id}`,{});
        }
    }
}

export default AccountApi;


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