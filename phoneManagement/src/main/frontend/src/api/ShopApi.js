import {requestApiWithAccessToken} from "./ApiCommon";

function ShopApi(accessToken){
    return {
        getCorpListForRoleDetail : async (keyword)=>{
            return await requestApiWithAccessToken.post('/api/v1/corp/search/role-detail', {
                keyword: keyword
            }, accessToken);
        },
        addShop : async (data)=>{
            return await requestApiWithAccessToken.post('/api/v1/shop/add',data,accessToken);
        },
        getShopListByReps : async ()=>{
            return await requestApiWithAccessToken.get('/api/v1/shop/list',accessToken);
        }
    }
}

export default ShopApi;




