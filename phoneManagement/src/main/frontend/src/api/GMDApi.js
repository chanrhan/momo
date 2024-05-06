import {requestApiWithAccessToken} from "./ApiCommon";
import {keyboard} from "@testing-library/user-event/dist/keyboard";

function GMDApi(accessToken){
    return {
        getDevice: async (keyword)=>{
            return await requestApiWithAccessToken.get(`/api/v1/gmd/device?keyword=${keyword}`,accessToken);
        },
        getExtraService: async (keyword)=>{
            return await requestApiWithAccessToken.post(`/api/v1/gmd/exsvc?keyword=${keyword}`, accessToken);
        }
    }
}

export default GMDApi;