import {requestAPI, requestApiWithAccessToken} from "./ApiCommon";

function NoteApi(accessToken){
    return {
        countUnreadNotification: async ()=>{
            return await requestApiWithAccessToken.get('/api/v1/note/count/unread', accessToken);
        },
        readAll: async ()=>{
            return await requestApiWithAccessToken.get('/api/v1/note/read/all', accessToken);
        },
        getNotificationList: async ()=>{
            return await requestApiWithAccessToken.get('/api/v1/note/list', accessToken);
        }
    }
}

export default NoteApi;