import {AxiosApi, AxiosApiWithAccessToken} from "./ApiCommon";

function SolvedAcApi(accessToken){
    // const axiosApiWithAccessToken = AxiosApiWithAccessToken();
    const axiosApi = AxiosApi();
    return {
        getAllUsers: async ()=>{
            return axiosApi.get(`/api/v1/solved-ac/user`);
        },
        getProblem: async (body)=>{
            return axiosApi.post(`/api/v1/solved-ac/problem`, body, null);
        },
        loadBaekjoon: async ()=>{
            return axiosApi.get(`/api/v1/solved-ac/reload`, null);
        },
        getSharedProblem: async (date)=>{
            return axiosApi.get(`/api/v1/solved-ac/shared-problem?date=${date}`, null);
        },
        updateSharedProblem: async (date, body)=>{
            return axiosApi.post(`/api/v1/solved-ac/shared-problem?date=${date}`, body, null);
        },
    }
}

export default SolvedAcApi;