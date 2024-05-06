import {requestApiWithAccessToken} from "./ApiCommon";

function ShopApi(accessToken){
    return {
        getCorp : async ({keyword})=>{
            return await requestApiWithAccessToken.get(`/api/v1/corp/search/role-detail?keyword=${keyword}`, accessToken);
        },
        addShop : async (data)=>{
            return await requestApiWithAccessToken.post('/api/v1/shop',data,accessToken);
        },
        getShop : async ()=>{
            return await requestApiWithAccessToken.get('/api/v1/shop',accessToken);
        }
    }
}

export default ShopApi;




