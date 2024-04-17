import useApi from "../utils/useApi";
import useEmitter from "../utils/useEmitter";
import {useEffect, useState} from "react";
import {HttpStatusCode} from "axios";
import {ObjectUtils} from "../utils/objectUtil";
import {useDispatch} from "react-redux";
import {localActions} from "../store/slices/localStorageSlice";

function Notification(){
    const dispatch = useDispatch();
    const {noteApi} = useApi();
    const [noteList, setNoteList] = useState([]);

    useEffect(()=>{
        noteApi.getNotificationList().then(({status,data})=>{
            if(status === HttpStatusCode.Ok && !ObjectUtils.isEmpty(data)){
                setNoteList(data)
                dispatch(localActions.updateUnreadNote(0));
            }
        })
    },[])

    return (
        <div>
            <h3 className='debug-page'>Notification Page</h3>
            <h4>알림</h4>
            <div>
                {
                    noteList.map((value,index)=>{
                        return <NoteCard key={index} note={value}/>
                    })
                }
            </div>
        </div>
    )
}

function NoteCard({note}){
    return (
        <div className='border border-1 d-flex flex-column justify-content-center'>
            <p>{note.sender_nm}</p>
            <p>{note.content}</p>
            <p>{note.send_dt}</p>
            <p>{note.read_st}</p>
        </div>
    )
}

export default Notification;