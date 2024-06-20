import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getProfilePicture} from "../../api/FileUtils";
import { FaCircle } from "react-icons/fa";
import {ObjectUtils} from "../../utils/objectUtil";

function ChatRoomUserCard({user, online}){
    const {accessToken} = useSelector(state=>state.authReducer);
    const [pfp, setPfp] = useState('');

    useEffect(()=>{
        const getImage = async ()=>{
            const img = await getProfilePicture(user.user_id, accessToken)
            setPfp(img);
        }
        getImage();
    },[])


    return (
        <div className='d-flex flex-row align-items-center'>
            <p><img src={pfp} style={{width: '75px'}} alt='pfp'/></p>
            <FaCircle color={`${online ? 'green': 'red'}`}/>
            <h4 className='ms-2'>{user.user_nm}</h4>
        </div>
    )
}

export default ChatRoomUserCard;