import {AxiosApi, AxiosApiWithAccessToken} from "./ApiCommon";
import {keyboard} from "@testing-library/user-event/dist/keyboard";

function GMDApi(accessToken){
    const axiosApiWithAccessToken = AxiosApiWithAccessToken();
    // const axiosApiWithAccessToken = AxiosApiWithAccessToken();

    return {
        getData: async (type, keyword = '', provider = '')=>{
            return await axiosApiWithAccessToken.get(`/api/v1/gmd?type=${type}&keyword=${keyword}&provider=${provider}`, accessToken);
        },
        getSecondDeviceById: async (id)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/gmd/sec-device/${id}`, accessToken);
        },
        insert: async (type, body)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/gmd?type=${type}`, body, accessToken);
        },
        insertAll: async (type, body)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/gmd/all?type=${type}`, body, accessToken);
        },
        deleteAll: async (type, body)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/gmd/del?type=${type}`, body, accessToken);
        },
        updateItem: async (type, body)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/gmd/update?type=${type}`, body, accessToken);
        },
        changeOrder: async (type, body)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/gmd/change-order?type=${type}`, body, accessToken);
        },
        getMessageTemplate: async ()=>{
            return await axiosApiWithAccessToken.get(`/api/v1/gmd/msg/template`, accessToken);
        },
        insertMessageTemplate: async (body)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/gmd/msg/template/add`, body, accessToken);
        },
        updateMessageTemplate: async (body)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/gmd/msg/template/update`, body, accessToken);
        },
        deleteMessageTemplate: async (msgId)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/gmd/msg/template/del?msgId=${msgId}`, accessToken);
        },
    }
}

export default GMDApi;