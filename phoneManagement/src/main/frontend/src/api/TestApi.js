import {requestAPI} from "./ApiCommon";

function TestApi(accessToken){
    return {
        note: async (data)=>{
            return await requestAPI.post('/api/v1/test/send', data);
        }
    }
}

export default TestApi;