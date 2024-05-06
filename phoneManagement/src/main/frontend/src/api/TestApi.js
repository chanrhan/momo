import {requestAPI} from "./ApiCommon";

function TestApi(accessToken){
    return {
        note: async (data)=>{
            return await requestAPI.post('/api/v1/test/send', data);
        },
        sendMultipartFile: async (data, option)=>{
            return await requestAPI.post('/api/v1/test/multipart', data, option);
        }
    }
}

export default TestApi;