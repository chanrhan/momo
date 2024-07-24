import {AxiosApi, AxiosApiWithAccessToken} from "./ApiCommon";
import {keyboard} from "@testing-library/user-event/dist/keyboard";

function GMDApi(accessToken){
    const axiosApiWithAccessToken = AxiosApiWithAccessToken();
    // const axiosApiWithAccessToken = AxiosApiWithAccessToken();

    return {
        getDevice: async (keyword)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/gmd/device?keyword=${keyword}`, accessToken);
        },
        getSecondDevice: async (keyword)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/gmd/sec-device?keyword=${keyword}`, accessToken);
        },
        getSecondDeviceById: async (id)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/gmd/sec-device/${id}`, accessToken);
        },
        getExtraService: async (keyword)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/gmd/exsvc?keyword=${keyword}`, accessToken);
        },
        getInternetPlan: async (keyword)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/gmd/internet-plan?keyword=${keyword}`, accessToken);
        },
        getTvPlan: async (keyword)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/gmd/tv-plan?keyword=${keyword}`, accessToken);
        },
        getCtPlan: async (keyword)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/gmd/ct-plan?keyword=${keyword}`, accessToken);
        },
        getSupportDiv: async (keyword)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/gmd/sup-div?keyword=${keyword}`, accessToken);
        },
        getAddDiv: async (keyword)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/gmd/add-div?keyword=${keyword}`, accessToken);
        },
        getCombTp: async (keyword)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/gmd/comb-tp?keyword=${keyword}`, accessToken);
        },
    }
}

export default GMDApi;