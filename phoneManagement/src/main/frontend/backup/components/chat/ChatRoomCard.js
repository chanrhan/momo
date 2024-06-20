function ChatRoomCard({room, onSelect}){
    return (
        <div className='border border-2 d-flex flex-row justify-content-center' onClick={()=>{
            onSelect(room.room_id);
        }}>
            <p>사진</p>
            <div>
                <h5><b>{room.room_nm}</b></h5>
                <h6>{room.last_content}</h6>
                <h6>{room.last_send_dt}</h6>
                <h6>{room.stacked_chat}</h6>
            </div>
        </div>
    )
}

export default ChatRoomCard;