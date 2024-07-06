import {AxiosApi, AxiosApiWithAccessToken} from "./ApiCommon";


function PublicApi(){
    const axiosApi = AxiosApi();

    return {
        login: async (data)=>{
          return await axiosApi.post('/api/v1/public/login',data);
        },
        signup : async (data)=>{
            return await axiosApi.post('/api/v1/public/signup', data);
        },

        findUser : async (findBy, value)=>{
            return await axiosApi.get(`/api/v1/public/user/find?${findBy}=${value}`, {});
        },
        existUserId : async(id)=>{
            return await axiosApi.get(`/api/v1/public/user/id/${id}/exist`,{});
        },
        matchUserId : async(id, findBy, value)=>{
            return await axiosApi.get(`/api/v1/public/user/${id}/match?${findBy}=${value}`, {});
        },
        // 비밀번호 재설정
        // 보안**
        resetPassword : async (data, resetToken)=>{
            return await AxiosApi.post('/api/v1/public/reset/password', data, {
                headers:{
                    "RESET-TOKEN": resetToken
                }
            });
        },
        getResetToken : async (data)=>{
            return await AxiosApi.post('/api/v1/auth/token/reset-pwd', data, {});
        },
        getProtectedTelAndEmail : async(id)=>{
            return await AxiosApi.get(`/api/v1/public/user/tel-email/protected?id=${id}`,{});
        }
    }
}

export default PublicApi;


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