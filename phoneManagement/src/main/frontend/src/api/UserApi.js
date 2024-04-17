import {requestApiWithAccessToken} from "./ApiCommon";
import {ObjectUtils} from "../utils/objectUtil";

function UserApi(accessToken){
    return {
        getUserInfo : async ()=>{
            return await requestApiWithAccessToken.get('/api/v1/user/common/info', accessToken);
        },
        getProfilePicture : async (id)=>{
            const response = await requestApiWithAccessToken.get(`/api/v1/img/pfp/${id}`, accessToken);
            if(response.status === 200){
                if(!ObjectUtils.isEmpty(response.data)){
                    return response.data;
                }
            }
            return '/img/tmp/default_pfp.png';
        },
        updateNickname : async (nickname)=>{
            return await requestApiWithAccessToken.get(`/api/v1/user/update/nickname?nickname=${nickname}`,accessToken);
        },
        updateCurrentShop : async (shopId)=>{
            return await requestApiWithAccessToken.get(`/api/v1/user/update/shop?id=${shopId}`, accessToken);
        },
        updateUserInfo : async (data)=>{
            return await requestApiWithAccessToken.post('/api/v1/user/update/info', data, accessToken);
        },
        updatePfp : async (data)=>{
            return await requestApiWithAccessToken.post('/api/v1/user/update/pfp',data, accessToken);
        },
        getStaffList : async ()=>{
            return await requestApiWithAccessToken.get('/api/v1/user/list/staff', accessToken);
        },
    }
}

export default UserApi;

// export const updateNickname = async (nickname, accessToken)=>{
//     return await requestApiWithAccessToken.get(`/api/v1/user/update/nickname?nickname=${nickname}`,accessToken);
// }
//
// export const updateCurrentShop = async (shopId, accessToken)=>{
//     return await requestApiWithAccessToken.get(`/api/v1/user/update/shop?id=${shopId}`, accessToken);
// }


