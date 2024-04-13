import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

function ChatLog({chat}){
    const userInfo = useSelector(state=>state.userReducer);

    const [isMine, setIsMine] = useState((userInfo.id === chat.user_id));

    if(chat.server_send){
        return (
            <div className='chat chat-server'>
                <p>{chat.content}</p>
            </div>
        )
    }

    const getNonRead = ()=>{
        return chat.non_read !== 0 ? chat.non_read : '';
    }

    return (
        <div className={`chat ${isMine ? 'chat-mine' : 'chat-other'}`}>
            <p className={`chat-user-name ${isMine ? 'align-self-end' : 'align-self-start'}`}>{chat.user_nm}</p>
            <div className='d-flex flex-row'>
            {
                isMine ? (
                    <>
                        <p className='ms-2 me-2 mt-4'>{getNonRead()}</p>
                        <div className='d-flex'>
                            <p className={`chat-content ${isMine ? 'chat-self' : ''}`}>{chat.content}</p>
                        </div>
                    </>
                ) : <>
                    <div>
                        <p className={`chat-content ${isMine ? 'chat-self' : ''}`}>{chat.content}</p>
                    </div>
                    <p className='ms-2 me-2 mt-4'>{getNonRead()}</p>
                </>
            }
            </div>
            <p>{chat.send_dt}</p>
        </div>
    )
}

export default ChatLog;