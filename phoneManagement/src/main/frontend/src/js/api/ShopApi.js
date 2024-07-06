import {AxiosApiWithAccessToken} from "./ApiCommon";

function ShopApi(accessToken){
    const axiosApiWithAccessToken = AxiosApiWithAccessToken();

    return {
        // 안씀 이거
        getCorp : async ({keyword})=>{
            return await axiosApiWithAccessToken.get(`/api/v1/corp/search/role-detail?keyword=${keyword}`, accessToken);
        },
        addShop : async (data)=>{
            return await axiosApiWithAccessToken.post('/api/v1/shop',data,accessToken);
        },
        addShopBulk: async (data)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/shop/bulk`, data, accessToken);
        },
        addCorp: async(data)=>{
          return await axiosApiWithAccessToken.post('api/v1/corp',data,accessToken)
        },
        getShop : async ()=>{
            return await axiosApiWithAccessToken.get('/api/v1/shop',accessToken);
        },
        getShopAll : async ()=>{
            return await axiosApiWithAccessToken.get('/api/v1/shop/all',accessToken);
        }
    }
}

export default ShopApi;




