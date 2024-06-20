import axiosInstance from "../utils/axiosInstance";
import axios from "axios";

const statusError = {
    status: false,
    error: "연결이 원활하지 않습니다. 잠시 후 다시 시도해 주세요"
}

const responseResult = (res)=>{

}

export const requestAPI = {
    async post(url, data, option){
        const response = await axiosInstance.post(url, data, option)
            .catch(()=>{
                return statusError;
            });

        if(response.status === 200){
            return {
                status: response.status,
                data: response.data,
                jwt: {
                    access_token: response.headers.get('authorization'),
                    refresh_token: response.headers.get('refreshtoken')
                }
            }
        }else{
            return statusError;
        }
    },
    async get(url, option){
        const response = await axiosInstance.get(url, option)
            .catch(()=>{
                return statusError;
            });

        if(response.status === 200){
            return {
                status: response.status,
                data: response.data,
                jwt: {
                    access_token: response.headers.get('authorization'),
                    refresh_token: response.headers.get('refreshtoken')
                }
            }
        }else{
            return statusError;
        }
    },
    async delete(url, option){
        return await axiosInstance.delete(url, option);
    },
    async put(url, data, option){
        return await axiosInstance.put(url, data, option);
    }
}

export const requestApiWithAccessToken = {
    async post(url, data, accessToken){
        return requestAPI.post(url,data,{
            headers: {
                "X-ACCESS-TOKEN": accessToken
            }
        });
    },
    async get(url, accessToken){
        return requestAPI.get(url, {
            headers: {
                "X-ACCESS-TOKEN": accessToken
            }
        });
    },
    async delete(url, accessToken, data){
        return requestAPI.delete(url, {
            data: data,
            headers: {
                "X-ACCESS-TOKEN": accessToken
            }
        });
    },
    async put(url, data, accessToken){
        return requestAPI.put(url, data, {
            headers: {
                "X-ACCESS-TOKEN": accessToken
            }
        });
    }
}
