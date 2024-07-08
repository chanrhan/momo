import {useDispatch, useSelector} from "react-redux";
import {clickawayActions, clickawayReducer} from "../store/slices/clickawaySlice";

export function useClickaway({}){
    const dispatch = useDispatch();

    const push = (value)=>{
        dispatch(clickawayActions.push(value))
    }

    const pop = ()=>{
        dispatch(clickawayActions.pop())
    }

    return {
        push,
        pop
    }
}