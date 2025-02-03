import {AxiosApi, AxiosApiWithAccessToken} from "./ApiCommon";

function PostImageApi(accessToken){
    const axiosApiWithAccessToken = AxiosApiWithAccessToken();
    const axiosApi = AxiosApi();

    return {
        getPostImageAll: async ()=>{
            return await axiosApiWithAccessToken.get('/api/v1/pimg', accessToken);
        },
        addPostImage: async (body)=>{
            const option = {
                headers:{
                    'X-ACCESS-TOKEN': accessToken,
                    'Content-Type': "multipart/form-data"
                }
            }
            return await axiosApi.post('/api/v1/pimg/add', body, option)
        },
        addEmptyPostImage: async ()=>{
            return await axiosApi.get('/api/v1/pimg/add/empty', null)
        },
        updatePostImage: async (body)=>{
            const option = {
                headers:{
                    'X-ACCESS-TOKEN': accessToken,
                    'Content-Type': "multipart/form-data"
                }
            }
            return await axiosApi.post('/api/v1/pimg/update/file', body, option)
        },
        updatePostText: async (body)=>{
            return await axiosApi.post('/api/v1/pimg/update/text', body, null)
        },
        deletePost: async (id)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/pimg/del?id=${id}`, accessToken)
        },
        deletePostImage: async (id)=>{
            return await axiosApiWithAccessToken.get(`/api/v1/pimg/del/file?id=${id}`, accessToken)
        }
    }
}

export default PostImageApi;