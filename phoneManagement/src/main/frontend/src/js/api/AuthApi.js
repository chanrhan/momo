import {requestAPI, requestApiWithAccessToken} from "./ApiCommon";


function AuthApi(accessToken){
    return {
        getResetToken : async (data)=>{
            return await requestAPI.post('/api/v1/auth/token/reset-pwd', data, {});
        }
    }
}

export default AuthApi;
