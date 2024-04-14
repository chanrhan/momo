import {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sseActions} from "../store/slices/sseSlice";
import {EventSourcePolyfill} from 'event-source-polyfill'

function SseHeader(){
    const dispatch = useDispatch();
    const {accessToken} = useSelector(state=>state.authReducer);

    useEffect(()=>{
        const evtSrc = new EventSourcePolyfill("http://localhost:8080/sse/connect",{
            headers:{
                'X-ACCESS-TOKEN': accessToken
            }
        });
        dispatch(sseActions.setEventSource(evtSrc));
        addEventListeners();
    },[])

    const onConnect = (e)=>{
        const { data: receivedConnectData } = e;
        console.log('connect event data: ',receivedConnectData);
    }

    const onNote = (e)=>{
        const { data: receivedConnectData } = e;
        alert(`메세지가 도착했습니다 ${receivedConnectData}`);
    }

    const addEventListeners =()=>{
        dispatch(sseActions.addEventListener({
            type: 'connect',
            listener: onConnect
        }));
        dispatch(sseActions.addEventListener({
            type: 'note',
            listener: onNote
        }))
    }
}

export default SseHeader;