import {AxiosApi, AxiosApiWithAccessToken} from "./ApiCommon";

export function MessageApi(accessToken){
    const axiosApiWithAccessToken = AxiosApiWithAccessToken();
    const axiosApi = AxiosApi();

    return {
        getReserveMsgForCalendar: async (date)=>{
            return axiosApiWithAccessToken.get(`/api/v1/msg/calendar?date=${date}`, accessToken);
        },
        getReserveMsgDetail: async (date)=>{
            return axiosApiWithAccessToken.get(`/api/v1/msg/detail?date=${date}`, accessToken);
        },
        getReserveMsgAll: async (body)=>{
            return axiosApiWithAccessToken.post(`/api/v1/msg/all`, body,  accessToken);
        },
        // getReserveMsgBySale: async (saleId)=>{
        //     return axiosApiWithAccessToken.get(`/api/v1/msg/sale?saleId=${saleId}`, accessToken);
        // },
        sendAlimtalk: async (data)=>{
            return axiosApiWithAccessToken.post(`/api/v1/msg/send`,  data,accessToken);
        },
        // deleteReserveMsg: async (data)=>{
        //     return axiosApiWithAccessToken.post(`/api/v1/msg/del`,  data,accessToken);
        // },
        sendAuthNumber: async (body)=>{
            return await axiosApi.post('/api/v1/msg/sms/send/auth', body, null);
        },
        // Aligo
        getSMSList: async (body)=>{
            return await axiosApiWithAccessToken.post('/api/v1/msg/sms/list', body, accessToken);
        },
        authenticateKakaoChannel: async ()=>{
            return await axiosApiWithAccessToken.post('/api/v1/msg/alimtalk/auth', null, accessToken);
        },
        getAlimtalkHistoryList: async (body)=>{
            return await axiosApiWithAccessToken.post('/api/v1/msg/alimtalk/history/list', body, accessToken);
        },
        getAlimtalkHistoryDetail: async (body)=>{
            return await axiosApiWithAccessToken.post('/api/v1/msg/alimtalk/history/detail', body, accessToken);
        },
        getMessageTemplateList: async (body)=>{
            return await axiosApiWithAccessToken.post('/api/v1/msg/template/list', body, accessToken);
        }
    }
}
