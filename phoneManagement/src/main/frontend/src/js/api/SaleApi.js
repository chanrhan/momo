import {AxiosApi, AxiosApiWithAccessToken} from "./ApiCommon";
import {ObjectUtils} from "../utils/objectUtil";

function SaleApi(accessToken){
    const axiosApiWithAccessToken = AxiosApiWithAccessToken();
    const axiosApi = AxiosApi();

    return {
        addSale: async (data)=>{
            const option = {
                headers:{
                    'X-ACCESS-TOKEN': accessToken,
                    'Content-Type': "multipart/form-data"
                }
            }
            return await axiosApi.post('/api/v1/sale/add',data,option);
        },
        getSaleAll : async (body)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/sale/all`, body, accessToken);
        },
        getSaleDetail: async (saleId)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/sale/detail/${saleId}`,accessToken);
        },
        getSaleTotalCount: async ()=>{
            return await axiosApiWithAccessToken.get(`/api/v1/sale/count/total`, accessToken);
        },
        getSaleByCategory : async (body)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/sale/category`, body, accessToken);
        },
        updateSale: async (body)=>{
            const option = {
                headers:{
                    'X-ACCESS-TOKEN': accessToken,
                    'Content-Type': "multipart/form-data"
                }
            }
            return await axiosApi.post(`/api/v1/sale/update`,body, option);
        },
        deleteSales : async (data)=>{
            return await axiosApiWithAccessToken.post('/api/v1/sale/delete', data, accessToken);
        }
    }
}

export default SaleApi;

