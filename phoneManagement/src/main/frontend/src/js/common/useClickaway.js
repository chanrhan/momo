import {useDispatch, useSelector} from "react-redux";
import {clickawayActions, clickawayReducer} from "../store/slices/clickawaySlice";

export function useClickaway(){
    const dispatch = useDispatch();

    const push = (componentRef, onClose)=>{
        dispatch(clickawayActions.push({
            componentRef: componentRef,
            onClose: onClose
        }))
    }

    const pop = ()=>{
        return dispatch(clickawayActions.pop())
    }

    return {
        push,
        pop
    }
}