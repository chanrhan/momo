import {AxiosApiWithAccessToken} from "./ApiCommon";
import {ObjectUtils} from "../utils/objectUtil";
import useModal from "../hook/useModal";

function UserApi(accessToken){
    const axiosApiWithAccessToken = AxiosApiWithAccessToken();

    return {
        getUser : async ()=>{
            return await axiosApiWithAccessToken.get('/api/v1/user/info', accessToken);
        },
        // 이건 이미지 api로 옮겨야 함
        getProfilePicture : async (id)=>{
            // const response = await axiosApiWithAccessToken.get(`/api/v1/img/pfp/${id}`, accessToken);
            // if(response.status === 200){
            //     if(!ObjectUtils.isEmpty(response.data)){
            //         return response.data;
            //     }
            // }
            return '/img/tmp/default_pfp.png';
        },
        checkBpnoStatus : async (bpNo)=>{
            // console.table(array)
            return await axiosApiWithAccessToken.get(`/api/v1/user/bpno/status?bpNo=${bpNo}`, accessToken);
        },
        updateNickname : async (nickname)=>{
            return await axiosApiWithAccessToken.put(`/api/v1/user/nickname?nickname=${nickname}`,accessToken);
        },
        updateCurrentShop : async (shopId, userId)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/user/${userId}/shop?shopId=${shopId}`, accessToken);
        },
        updateUserInfo : async (data)=>{
            return await axiosApiWithAccessToken.post('/api/v1/user/info', data, accessToken);
        },
        updateRole: async (userId, role)=>{
            return await axiosApiWithAccessToken.put(`/api/v1/user/${userId}/role?role=${role}`)
        },
        updatePfp : async (data)=>{
            return await axiosApiWithAccessToken.post('/api/v1/user/update/pfp',data, accessToken);
        },
        updatePassword: async (data)=>{
          return await axiosApiWithAccessToken.put('/api/v1/user/password',data, accessToken);
        },
        getUserAsStaff : async ()=>{
            return await axiosApiWithAccessToken.get('/api/v1/user/staff', accessToken);
        },
        getUserAll: async (keyword, keydate)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/user/all?keyword=${keyword}&keydate=${keydate}`, accessToken);
        },
        sendShopRequest: async (shopId)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/user/shop/request?shopId=${shopId}`,accessToken)
        },
        approveShopRequest: async (userId, shopId)=>{
            return await axiosApiWithAccessToken.put(`/api/v1/user/${userId}/approve?shopId=${shopId}`, accessToken);
        }
    }
}

export default UserApi;

