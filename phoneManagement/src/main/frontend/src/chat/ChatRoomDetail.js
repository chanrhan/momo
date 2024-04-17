import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {getAllChatMessage, getChatRoomUserList, getConnectedUserList, sendChat} from "../api/ChatApi";
import {useSelector} from "react-redux";
import {ObjectUtils} from "../utils/objectUtil";
import ChatLog from "./ChatLog";
import chat from "./Chat";
import {getProfilePicture} from "../api/FileUtils";
import ChatRoomUserCard from "./ChatRoomUserCard";
import useApi from "../utils/useApi";

export const ChatRoomDetail = forwardRef((props, ref)=>{
    useImperativeHandle(ref, ()=>(
        {
            onSend,
            onRead,
            onJoin
        }
    ))

    const {client, detail} = props;

    const {chatApi} = useApi();

    const userInfo = useSelector(state=>state.userReducer);

    const [roomUserList, setRoomUserList] = useState([]);
    const [invitableUserList, setInvitableUserList] = useState([]);

    const [chatLog, setChatLog] = useState([]);
    const [sendInput, setSendInput] = useState('');

    const [onlineList, setOnlineList] = useState({});

    useEffect(()=>{
        if(!ObjectUtils.isEmpty(detail)){
            loadAllChat();
            loadChatRoomUser();
        }
    },[detail]);

    useEffect(()=>{
        if(!ObjectUtils.isEmpty(roomUserList)){
            loadConnectedUser();
        }
    }, [roomUserList])

    const loadAllChat = async ()=>{
        await chatApi.getAllChatMessage(detail.room_id).then(({status,data})=>{
            if(status === 200 && !ObjectUtils.isEmpty(data)){
                // console.log(`chat log: ${response.data}`)
                setChatLog(data);
            }
        })

    }

    const handleSendInput = (e)=>{
        setSendInput(e.target.value);
    }

    const send = async ()=>{
        await chatApi.sendChat(client, detail.room_id, {
            user_id: userInfo.id,
            content: sendInput
        });
    }

    const onSend = (chatLogs)=>{
        // console.log(`new chat log: `)
        // console.table(chatLogs)
        setChatLog([...chatLog, chatLogs[0]]);
    }

    const onRead = (chatLogs)=>{
        const copy = [...chatLog];
        chatLogs.map(value=>{
            copy.map(log=>{
                if(value.chat_id === log.chat_id){
                    log.non_read = value.non_read;
                }
            })
        })
        setChatLog(copy);
    }

    const onJoin = async ()=>{

    }

    const loadChatRoomUser = async ()=>{
         await chatApi.getChatRoomUserList(detail.room_id).then(({status,data})=>{
             if(status === 200){
                 setRoomUserList(data);
             }
         })

    }

    const loadConnectedUser = async ()=>{
        await chatApi.getConnectedUserList().then(({status,data})=>{
            if(status === 200){
                let copy = {...onlineList};
                data.map(user=>{
                    copy[user] = true;
                })

                setOnlineList(copy)
            }
        })

    }

    if(ObjectUtils.isEmpty(detail)){
        return <ChatRoomNotSelected/>
    }

    return (
        <div className='border border-2 d-flex flex-row'>
            <div className='flex-column'>
                <div className='chat-header'>
                    <h3 className='align-self-start'>{detail.room_nm}</h3>
                    <h5 className='ms-1 mt-2 align-self-start'>{detail.room_hc}명</h5>
                </div>
                <div className='chat-container'>
                    {
                        chatLog && chatLog.map(function (value,index){
                            return <ChatLog key={index} chat={value}/>
                        })
                    }
                </div>
                <div className='d-flex flex-row justify-content-between'>
                    <input type="text" className='chat-text-input' onChange={handleSendInput}/>
                    <button className='btn btn-primary' style={{width: '150px'}} onClick={send}>전송</button>
                </div>
            </div>
            <div className='border border-2'>
                <p>사진</p>
                <div>
                    <p>알림</p>
                </div>
                <div>
                    <div>
                        <h4>참여자 {detail.room_hc}명</h4>
                    </div>
                    <div>
                        {
                            roomUserList.map((user,index)=>{
                                return <ChatRoomUserCard key={index} user={user} online={onlineList[user.user_id]}/>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
})

function ChatRoomNotSelected(){
    return (
        <div className='chatroom-non-selected'>
            <h1>채팅방을 선택해주세요</h1>
        </div>
    )
}



