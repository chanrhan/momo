import {AxiosApi, AxiosApiWithAccessToken} from "./ApiCommon";

export function AligoApi(accessToken){
    const axiosApi = AxiosApi();
    const axiosApiWithAccessToken = AxiosApiWithAccessToken();

    return {
        sendAuthNumber: async (body)=>{
            return await axiosApi.post('/api/v1/aligo/sms/send/auth', body, null);
        },
        getSMSList: async (body)=>{
            return await axiosApiWithAccessToken.post('/api/v1/aligo/sms/list', body, accessToken);
        },

    }
}
