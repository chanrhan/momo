import {AxiosApi, AxiosApiWithAccessToken} from "./ApiCommon";

export function AdminApi(accessToken){
    const axiosApi = AxiosApi();
    const axiosApiWithAccessToken = AxiosApiWithAccessToken();

    return {
        insertVisitedShop: async (body)=>{
            return await axiosApiWithAccessToken.post('/api/v1/admin//visited-shop', body, accessToken);
        },
        getVisitedShopList: async (body)=>{
            return await axiosApiWithAccessToken.post('/api/v1/admin//visited-shop/list', body, accessToken);
        }

    }
}
