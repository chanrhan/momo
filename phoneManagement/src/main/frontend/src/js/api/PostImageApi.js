import {AxiosApi, AxiosApiWithAccessToken} from "./ApiCommon";

function PostImageApi(accessToken){
    const axiosApiWithAccessToken = AxiosApiWithAccessToken();

    return {
        getPostImageAll: async ()=>{
            return await axiosApiWithAccessToken.get('/api/v1/pimg', accessToken);
        },
        addPostImage: async (body)=>{
            return await axiosApiWithAccessToken.post('/api/v1/pimg/', accessToken)
        },
        deletePostImage: async (id)=>{
            return await axiosApiWithAccessToken.post(`/api/v1/pimg/del?id=${id}`, accessToken)
        }
    }
}

export default PostImageApi;