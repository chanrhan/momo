import {requestApiWithAccessToken} from "./ApiCommon";

function ShopApi(accessToken){
    return {
        getCorpListForRoleDetail : async ({keyword, order, asc})=>{
            return await requestApiWithAccessToken.get(`/api/v1/corp/search/role-detail?keyword=${keyword}&order=${order}&asc=${asc}`, accessToken);
        },
        addShop : async (data)=>{
            return await requestApiWithAccessToken.post('/api/v1/shop',data,accessToken);
        },
        getShopListByReps : async ()=>{
            return await requestApiWithAccessToken.get('/api/v1/shop',accessToken);
        }
    }
}

export default ShopApi;




