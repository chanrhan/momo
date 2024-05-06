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
        findUser : async ({name, tel, email})=>{
            return await requestAPI.get(`/api/v1/public/user?name=${name}&tel=${tel}&email=${email}`, {});
        },
        existUserId : async(id)=>{
            return await requestAPI.get(`/api/v1/public/user/id/${id}/exist`,{});
        },
        matchUserId : async(findBy, {id, tel, email})=>{
            return await requestAPI.get(`/api/v1/public/user/${id}/match?tel=${tel}&email=${email}`, {});
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
        getProtectedTelAndEmail : async(id)=>{
            return await requestAPI.get(`/api/v1/public/user/tel-email/protected?id=${id}`,{});
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