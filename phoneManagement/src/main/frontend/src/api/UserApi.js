import {requestApiWithAccessToken} from "./ApiCommon";

export const updateNickname = async (nickname, accessToken)=>{
    return await requestApiWithAccessToken.get(`/api/v1/user/update/nickname?nickname=${nickname}`,accessToken);
}