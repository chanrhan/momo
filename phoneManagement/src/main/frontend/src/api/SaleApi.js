import {requestAPIWithAccessToken} from "./ApiCommon";
import {isEmpty} from "../utils/objectUtil";

export const getSaleList = async (data, accessToken)=>{
    const response = await requestAPIWithAccessToken.post(`/api/v1/sale/list`,data, accessToken);
    if(response.status === 200){
        if(!isEmpty(response.data)){
            return response;
        }
    }
    response.data = [];
    return response;
}