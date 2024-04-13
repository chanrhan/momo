import {requestApiWithAccessToken} from "./ApiCommon";


export const getCorpListForRoleDetail = async (keyword, accessToken)=>{
    return await requestApiWithAccessToken.post('/api/v1/corp/search/role-detail', {
        keyword: keyword
    }, accessToken);
}

export const selectShop = async (shop, accessToken)=>{
    return await requestApiWithAccessToken.post();
}
