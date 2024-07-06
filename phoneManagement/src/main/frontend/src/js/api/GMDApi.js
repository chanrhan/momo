import {AxiosApi, AxiosApiWithAccessToken} from "./ApiCommon";
import {keyboard} from "@testing-library/user-event/dist/keyboard";

function GMDApi(accessToken){
    const axiosApi = AxiosApi();
    const axiosApiWithAccessToken = AxiosApiWithAccessToken();

    return {
        getDevice: async (keyword)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/gmd/device?keyword=${keyword}`,accessToken);
        },
        getExtraService: async (keyword)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/gmd/exsvc?keyword=${keyword}`, accessToken);
        },
        getPhoneModel: async ()=>{
            return await axiosApi.get('/api/v1/gmd/phone');
        }
    }
}

export default GMDApi;