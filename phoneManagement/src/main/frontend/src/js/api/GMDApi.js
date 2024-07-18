import {AxiosApi, AxiosApiWithAccessToken} from "./ApiCommon";
import {keyboard} from "@testing-library/user-event/dist/keyboard";

function GMDApi(){
    const axiosApi = AxiosApi();
    // const axiosApiWithAccessToken = AxiosApiWithAccessToken();

    return {
        getDevice: async (keyword)=>{
            return await axiosApi.get(`/api/v1/gmd/device?keyword=${keyword}`);
        },
        getSecondDevice: async (keyword)=>{
            return await axiosApi.get(`/api/v1/gmd/sec-device?keyword=${keyword}`);
        },
        getExtraService: async (keyword)=>{
            return await axiosApi.post(`/api/v1/gmd/exsvc?keyword=${keyword}`);
        },
        getInternetPlan: async (keyword)=>{
            return await axiosApi.get(`/api/v1/gmd/internet-plan?keyword=${keyword}`);
        },
        getTvPlan: async (keyword)=>{
            return await axiosApi.get(`/api/v1/gmd/tv-plan?keyword=${keyword}`);
        },
        getCtPlan: async (keyword)=>{
            return await axiosApi.get(`/api/v1/gmd/ct-plan?keyword=${keyword}`);
        },
    }
}

export default GMDApi;