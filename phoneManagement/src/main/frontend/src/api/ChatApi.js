import {requestApiWithAccessToken} from "./ApiCommon";

export const getConnectedUserList = async (accessToken)=>{
    return await requestApiWithAccessToken.get('/api/v1/chat/connected', accessToken);
}

export const createChatRoom = async (roomName, accessToken)=>{
    return await requestApiWithAccessToken.post('/api/v1/chat/room/create', {
        room_nm: roomName
    }, accessToken);
}

export const getChatRoomList = async (accessToken)=>{
    return await requestApiWithAccessToken.post('/api/v1/chat/room/list',{}, accessToken);
}

export const getChatRoomDetail = async (roomId, accessToken)=>{
    return await requestApiWithAccessToken.get(`/api/v1/chat/room/info/${roomId}`, accessToken);
}

export const getChatRoomHeadCount = async (roomId, accessToken)=>{
    return await requestApiWithAccessToken.get(`/api/v1/chat/room/hc/${roomId}`,accessToken);
}

export const getChatRoomUserList = async (roomId, accessToken)=>{
    return await requestApiWithAccessToken.get(`/api/v1/chat/room/user/${roomId}`,accessToken);
}

export const getInvitableUserList = async (keyword, accessToken)=>{
    return await requestApiWithAccessToken.post('/api/v1/chat/list/user/invitable',{
        keyword: keyword
    }, accessToken);
}

// accessToken이 필요할 수도 있음
export const inviteUser = async (client, roomId, userId)=>{
    client.current.publish({
        destination: `/pub/chat/room/invite/${roomId}`,
        body: JSON.stringify({
            user_id: userId
        })
    });
}

export const noteChat = async (client, roomId, data)=>{
    client.current.publish({
        destination: `/pub/chat/note/${roomId}`,
        body: JSON.stringify(data)
    });
}

export const getChatRoomNote = async (roomId, accessToken)=>{
    return await requestApiWithAccessToken.post('/api/v1/chat/note', {
        room_id: roomId
    }, accessToken);
}

export const sendChat = (client, roomId, data)=>{
    client.current.publish({
        destination: `/pub/chat/send/${roomId}`,
        body: JSON.stringify(data)
    })
}

export const readChatRoom = (client, roomId, userId)=>{
    client.current.publish({
        destination: `/pub/chat/read/${roomId}`,
        body: JSON.stringify({
            user_id: userId
        })
    });
}

export const getAllChatMessage = async (roomId, accessToken)=>{
    return await requestApiWithAccessToken.post('/api/v1/chat/msg/load/all', {
        room_id: roomId
    }, accessToken);
}

export const sendChatEmo = async (client, roomId, data)=>{
    client.current.publish({
        destination: `/pub/chat/emo/${roomId}`,
        body: JSON.stringify(data)
    });
}