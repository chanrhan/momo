import {AxiosApi} from "./ApiCommon";

function TestApi(accessToken){
    const axiosApi = AxiosApi();

    return {
        note: async (data)=>{
            return await axiosApi.post('/api/v1/test/send', data);
        },
        sendMultipartFile: async (data, option)=>{
            return await axiosApi.post('/api/v1/test/multipart', data, option);
        },
        getSale: async (shopId)=>{
            return await axiosApi.get(`/api/v1/test/sale?shopId=${shopId}`);
        },
        getException: async ({code, reason})=>{
            return await axiosApi.get(`/api/v1/test/exception?code=${code}&reason=${reason}`)
        },
        uploadFile: async (dir, data)=>{
            const option = {
                headers:{
                    'Content-Type': "multipart/form-data"
                }
            }
            return await axiosApi.post(`/api/v1/test/img?dir=${dir}`, data, option);
        },
        sendAlimTalk: async (body)=>{
            return await axiosApi.post('/api/v1/test/alimtalk', body);
        }
    }
}

export default TestApi;