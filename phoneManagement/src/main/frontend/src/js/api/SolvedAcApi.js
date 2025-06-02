import {AxiosApi, AxiosApiWithAccessToken} from "./ApiCommon";

function SolvedAcApi(accessToken){
    const axiosApiWithAccessToken = AxiosApiWithAccessToken();
    const axiosApi = AxiosApi();
    return {
        getLoginedUserInfo: async ()=>{
            return axiosApi.get(`/api/v1/solved-ac/user`);
        },
        getProblem: async (body)=>{
            return axiosApi.post(`/api/v1/solved-ac/problem`, body, null);
        },
    }
}

export default SolvedAcApi;