import {requestApiWithAccessToken} from "./ApiCommon";
import {ObjectUtils} from "../utils/objectUtil";

export const getProfilePicture = async (id, accessToken)=>{
    const response = await requestApiWithAccessToken.get(`/api/v1/img/pfp/${id}`, accessToken);
    if(response.status === 200){
        if(!ObjectUtils.isEmpty(response.data)){
            return response.data;
        }
    }
    return '/img/tmp/default_pfp.png';
}