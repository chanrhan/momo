import {requestApiWithAccessToken} from "./ApiCommon";


export const getCorpListForRoleDetail = async (keyword, accessToken)=>{
    return await requestApiWithAccessToken.post('/api/v1/corp/search/role-detail', {
        keyword: keyword
    }, accessToken);
}

// export const selectShop = async (shop, accessToken)=>{
//     return await requestApiWithAccessToken.post();
// }

export const addShop = async (data, acessToken)=>{
    return await requestApiWithAccessToken.post('/api/v1/shop/add',data,acessToken);
}

export const getShopListByReps = async (accessToken)=>{
    return await requestApiWithAccessToken.get('/api/v1/shop/list',accessToken);
}


