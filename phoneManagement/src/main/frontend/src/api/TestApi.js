import {requestAPI} from "./ApiCommon";

function TestApi(accessToken){
    return {
        note: async (data)=>{
            return await requestAPI.post('/api/v1/test/send', data);
        },
        sendMultipartFile: async (data, option)=>{
            return await requestAPI.post('/api/v1/test/multipart', data, option);
        },
        getSale: async (shopId)=>{
            return await requestAPI.get(`/api/v1/test/sale?shopId=${shopId}`);
        }
    }
}

export default TestApi;