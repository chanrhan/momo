import axiosInstance from "../utils/axiosInstance";

const statusError = {
    status: false,
    error: "연결이 원활하지 않습니다. 잠시 후 다시 시도해 주세요"
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
    }
}

export const requestAPIWithAccessToken = {
    async post(url, data, accessToken){
        const option = {
            headers: {
                "X-ACCESS-TOKEN": accessToken
            }
        }
        return requestAPI.post(url,data,option);
    },
    async get(url, accessToken){
        const option = {
            headers: {
                "X-ACCESS-TOKEN": accessToken
            }
        }
        return requestAPI.get(url, option);
    }
}
