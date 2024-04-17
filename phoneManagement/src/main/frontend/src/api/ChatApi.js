import {requestApiWithAccessToken} from "./ApiCommon";

function ChatApi(accessToken){
    return {
        getConnectedUserList : async ()=>{
            return await requestApiWithAccessToken.get('/api/v1/chat/connected', accessToken);
        },
        createChatRoom : async (roomName)=>{
            return await requestApiWithAccessToken.post('/api/v1/chat/room/create', {
                room_nm: roomName
            }, accessToken);
        },
        getChatRoomList : async ()=>{
            return await requestApiWithAccessToken.post('/api/v1/chat/room/list',{}, accessToken);
        },
        getChatRoomDetail : async (roomId)=>{
            return await requestApiWithAccessToken.get(`/api/v1/chat/room/info/${roomId}`, accessToken);
        },
        getChatRoomHeadCount : async (roomId)=>{
            return await requestApiWithAccessToken.get(`/api/v1/chat/room/hc/${roomId}`,accessToken);
        },
        getChatRoomUserList : async (roomId)=>{
            return await requestApiWithAccessToken.get(`/api/v1/chat/room/user/${roomId}`,accessToken);
        },
        getInvitableUserList : async (keyword)=>{
            return await requestApiWithAccessToken.post('/api/v1/chat/list/user/invitable',{
                keyword: keyword
            }, accessToken);
        },
        inviteUser : async (client, roomId, userId)=>{
            client.current.publish({
                destination: `/pub/chat/room/invite/${roomId}`,
                body: JSON.stringify({
                    user_id: userId
                })
            });
        },
        noteChat : async (client, roomId, data)=>{
            client.current.publish({
                destination: `/pub/chat/note/${roomId}`,
                body: JSON.stringify(data)
            });
        },
        getChatRoomNote : async (roomId)=>{
            return await requestApiWithAccessToken.post('/api/v1/chat/note', {
                room_id: roomId
            }, accessToken);
        },
        sendChat : (client, roomId, data)=>{
            client.current.publish({
                destination: `/pub/chat/send/${roomId}`,
                body: JSON.stringify(data)
            })
        },
        readChatRoom : (client, roomId, userId)=>{
            client.current.publish({
                destination: `/pub/chat/read/${roomId}`,
                body: JSON.stringify({
                    user_id: userId
                })
            });
        },
        getAllChatMessage : async (roomId)=>{
            return await requestApiWithAccessToken.post('/api/v1/chat/msg/load/all', {
                room_id: roomId
            }, accessToken);
        },
        sendChatEmo : async (client, roomId, data)=>{
            client.current.publish({
                destination: `/pub/chat/emo/${roomId}`,
                body: JSON.stringify(data)
            });
        }

    }
}

export default ChatApi;