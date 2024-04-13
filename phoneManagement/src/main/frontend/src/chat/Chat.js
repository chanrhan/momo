import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect, useMemo, useRef, useState} from "react";
import {Stomp} from '@stomp/stompjs'
import {connectClient, connectTestWS, disconnectClient} from "../utils/StompUtils";
import {getChatRoomDetail, getChatRoomList, readChatRoom} from "../api/ChatApi";
import ChatRoomCard from "./ChatRoomCard";
import {ChatRoomDetail} from "./ChatRoomDetail";
import {ObjectUtils} from "../utils/objectUtil";
import chatLog from "./ChatLog";

function Chat(){
    const {accessToken} = useSelector(state=>state.authReducer)
    const userInfo = useSelector(state=>state.userReducer);
    const client = useRef({});
    const chatRef = useRef();

    let isSubscribe = useRef(false);

    const currRoomId = useRef(0);
    const [chatRoomList, setChatRoomList] = useState([]);
    const [chatRoomDetail, setChatRoomDetail] = useState({});

    useEffect(()=>{
        connect();
        return ()=> disconnectClient(client);
    },[])

    const connect = ()=>{
        connectClient(client, accessToken, function (frame){
            // console.log(`Connection Success: ${frame}`)
            client.current.subscribe('/sub/chat/conn',function (result){
                // console.log(`result: ${result}`)
                const {header, body} = JSON.parse(result.body);
                console.log("conn Header: "+header)
                switch (header){
                    case "CONNECT":
                        connectChat(body.user_id);
                        break;
                    case "DISCONNECT":
                        disconnectChat(body.user_id);
                        break;
                }
            });
            loadChatRoom();
        })
    }

    const subscribe = (roomId)=>{
        client.current.subscribe(`/sub/chat/room/${roomId}`, function (msg){
            console.log(`chat msg: ${msg}`)
            if(!ObjectUtils.isEmpty(msg)){
                onChat(JSON.parse(msg.body), roomId);
            }
        })
    }

    const onChat = (res, roomId)=>{
        const {header, body} = res;
        console.log(`header: ${header}, body: ${body}`)
        console.log(`room id: ${roomId}, curr room id: ${currRoomId.current}`)
        if(roomId === currRoomId.current){
            console.log(`on chat: ${header}`)
            switch (header){
                case "CHAT":
                    onSend(roomId, body);
                    break;
                case "JOIN":
                    onSend(roomId, body);
                    loadChatRoomUser();
                    updateChatRoomHeadCount();
                    break;
                case "INVITE":
                    break;
                case "READ":
                    updateChatRead(body);
                    break;
                case "EMO":
                    break;
                case "DELETE":
                    break;
                case "NOTE":
                    break;
                case "QUIT":
                    break;
            }
        }else {
            if(header === "CHAT"){

            }
        }
    }



    const connectChat = (userId)=>{

    }

    const disconnectChat = (userId)=>{

    }

    const loadChatRoom = async ()=>{
        const response = await getChatRoomList(accessToken);
        if(response.status === 200 && response.data !== null){
            setChatRoomList(response.data);
            if(!isSubscribe.current){
                response.data.map(room=>{
                    subscribe(room.room_id);
                })
                isSubscribe.current = true;
            }
        }
    }

    const updateConnectedUsers = (userIdList)=>{

    }

    const setOnline = (userId)=>{

    }

    const setOffline = (userId)=>{

    }

    const updateChatRoom = (chatRoomList)=>{

    }

    const selectChatRoom = async (roomId)=>{
        const response = await getChatRoomDetail(roomId, accessToken);
        if(response.status === 200){
            setChatRoomDetail(response.data);
            console.log(`select room id:${response.data.room_id}`)
            currRoomId.current = response.data.room_id;
        }
    }

    const updateChatRoomHeadCount = ()=>{

    }

    const loadChatRoomUser = ()=>{
        chatRef.current.onJoin();
    }

    // 이건 보류
    const updateChatRoomUser = ()=>{

    }

    const updateInvitableUser = ()=>{

    }

    const selectInviteUser = (e)=>{

    }

    const invite = ()=>{

    }

    const note = ()=>{

    }

    const loadChatRoomNote = ()=>{

    }

    const updateNote = ()=>{

    }

    const foldNote = ()=>{

    }

    const onSend = (roomId, chat)=>{
        console.log(`on Send to ${roomId}: ${chat}`)

        if(!chat.server_send){
            chatRef.current.onSend(chat.chat_log);
            console.log(`read id: ${userInfo.id}`)
            readChatRoom(client, roomId, userInfo.id);
        }
    }

    const updateChatRead = (body)=>{
        chatRef.current.onRead(body);
        loadChatRoom();
    }

    const read = ()=>{

    }

    const loadAllChat = ()=>{

    }

    const updateChatLog = ()=>{

    }

    const showChatContextMenu = ()=>{

    }

    const hideChatContextMenu = ()=>{

    }

    const showChatEmoMenu = ()=>{

    }

    const hideChatEmoMenu = ()=>{

    }

    const sendChatEmo = ()=>{

    }

    const onEmo = ()=>{

    }

    const deleteChat = ()=>{

    }

    const showReplyPannel = ()=>{

    }

    const hideReplyPannel = ()=>{

    }



    return (
        <div>
            <p className='debug-page'>Chat Page</p>
            <div className='d-flex flex-row'>
                <div className='border border-1'>
                    <div className='d-flex flex-row'>
                        <h4>{userInfo.corp_nm}</h4>
                        <button className='btn btn-outline-secondary'>채팅방 추가</button>
                    </div>
                    <div>
                        {
                            chatRoomList.map(function (value, index){
                                return <ChatRoomCard key={index} room_id={value.room_id} room={value} onSelect={selectChatRoom} />
                            })
                        }
                    </div>
                </div>
                <ChatRoomDetail client={client} detail={chatRoomDetail} ref={chatRef}/>
            </div>
        </div>
    )
}



export default Chat;