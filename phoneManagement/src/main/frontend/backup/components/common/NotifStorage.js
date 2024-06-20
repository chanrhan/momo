import useApi from "../../hook/useApi";
import useEmitter from "../../hook/useEmitter";
import {useEffect, useState} from "react";
import {HttpStatusCode} from "axios";
import {ObjectUtils} from "../../utils/objectUtil";
import {useDispatch} from "react-redux";
import {localActions} from "../../store/slices/localStorageSlice";

function NotifStorage(){
    const dispatch = useDispatch();
    const {notifApi} = useApi();
    const [noteList, setNoteList] = useState([]);

    useEffect(()=>{
        notifApi.getNotifList().then(({status,data})=>{
            if(status === HttpStatusCode.Ok && !ObjectUtils.isEmpty(data)){
                setNoteList(data)
                dispatch(localActions.updateUnreadNotif(0));
            }
        })
    },[])

    return (
        <div className='ms-5 d-flex flex-column justify-content-center'>
            <h3 className='debug-page'>Notif Storage</h3>
            <h4>알림</h4>
            <div className='d-flex flex-column justify-content-center'>
                {
                    noteList.map((value,index)=>{
                        return <AlertItem key={index} alert={value}/>
                    })
                }
            </div>
        </div>
    )
}

function AlertItem({alert}){
    return (
        <div className={`border border-1 d-flex flex-column justify-content-center ${alert.read_st && 'text-secondary'}`}>
            <p>{alert.sender_nm}</p>
            <p>{alert.content}</p>
            <p>{alert.send_dt}</p>
            <p>{alert.read_st}</p>
        </div>
    )
}

export default NotifStorage;