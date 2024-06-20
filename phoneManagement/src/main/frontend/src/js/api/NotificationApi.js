import {requestAPI, requestApiWithAccessToken} from "./ApiCommon";

function NotificationApi(accessToken){
    return {
        countUnreadNotif: async ()=>{
            return await requestApiWithAccessToken.get('/api/v1/notif/count/unread', accessToken);
        },
        readAll: async ()=>{
            return await requestApiWithAccessToken.get('/api/v1/notif/read/all', accessToken);
        },
        getNotifList: async ()=>{
            return await requestApiWithAccessToken.get('/api/v1/notif', accessToken);
        }
    }
}

export default NotificationApi;