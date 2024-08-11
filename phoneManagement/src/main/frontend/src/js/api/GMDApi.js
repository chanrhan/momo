import {AxiosApi, AxiosApiWithAccessToken} from "./ApiCommon";
import {keyboard} from "@testing-library/user-event/dist/keyboard";

function GMDApi(accessToken){
    const axiosApiWithAccessToken = AxiosApiWithAccessToken();
    // const axiosApiWithAccessToken = AxiosApiWithAccessToken();

    return {
        getDevice: async (keyword, provider = '')=>{
            return await axiosApiWithAccessToken.get(`/api/v1/gmd/device?keyword=${keyword}&provider=${provider}`, accessToken);
        },
        getSecondDevice: async (keyword, provider = '')=>{
            return await axiosApiWithAccessToken.get(`/api/v1/gmd/sec-device?keyword=${keyword}&provider=${provider}`, accessToken);
        },
        getSecondDeviceById: async (id)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/gmd/sec-device/${id}`, accessToken);
        },
        getExtraService: async (keyword, provider= '')=>{
            return await axiosApiWithAccessToken.get(`/api/v1/gmd/exsvc?keyword=${keyword}&provider=${provider}`, accessToken);
        },
        getInternetPlan: async (keyword, provider= '')=>{
            return await axiosApiWithAccessToken.get(`/api/v1/gmd/internet-plan?keyword=${keyword}&provider=${provider}`, accessToken);
        },
        getTvPlan: async (keyword, provider= '')=>{
            return await axiosApiWithAccessToken.get(`/api/v1/gmd/tv-plan?keyword=${keyword}&provider=${provider}`, accessToken);
        },
        getCtPlan: async (keyword, provider= '')=>{
            return await axiosApiWithAccessToken.get(`/api/v1/gmd/ct-plan?keyword=${keyword}&provider=${provider}`, accessToken);
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