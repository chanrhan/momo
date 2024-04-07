import {requestAPIWithAccessToken} from "./ApiCommon";
import {isEmpty} from "../utils/objectUtil";

export const getProfilePicture = async (id, accessToken)=>{
    const response = await requestAPIWithAccessToken.get(`/api/v1/img/pfp/${id}`, accessToken);
    if(response.status === 200){
        if(!isEmpty(response.data)){
            return response.data;
        }
    }
    return '/img/tmp/default_pfp.png';
}