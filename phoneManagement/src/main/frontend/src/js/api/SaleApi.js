import {AxiosApi, AxiosApiWithAccessToken} from "./ApiCommon";
import {ObjectUtils} from "../utils/objectUtil";

function SaleApi(accessToken){
    const axiosApiWithAccessToken = AxiosApiWithAccessToken();
    // const axiosApi = AxiosApi();

    return {
        addSale: async (data)=>{
            const option = {
                headers:{
                    'X-ACCESS-TOKEN': accessToken,
                    'Content-Type': "multipart/form-data"
                }
            }
            return await axiosApiWithAccessToken.post('/api/v1/sale/add',data,option);
        },
        getSale : async (keyword, fromDate, toDate, order, asc, filters)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/sale`, {
                keyword: keyword,
                order: order,
                asc: asc,
                fromDate: fromDate,
                toDate: toDate,
                filters: filters
            }, accessToken);
        },
        getSaleByCategory : async (category, keyword, order, asc)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/sale/${category}`, {
                keyword: keyword,
                order: order,
                asc: asc
            }, accessToken);
        },
        deleteSales : async (data)=>{
            return await axiosApiWithAccessToken.del('/api/v1/sale/delete', data, accessToken);
        }
    }
}

export default SaleApi;

