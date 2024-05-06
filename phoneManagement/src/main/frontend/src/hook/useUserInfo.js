import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../store/slices/userSlice";

function useUserInfo(){
    const dispatch = useDispatch()
    const userInfo = useSelector(state=>state.userReducer);

    const setUser = (data)=>{
        dispatch(userActions.setUserInfo(data));
    }

    const clearUser = ()=>{
        dispatch(userActions.deleteUserInfo())
    }

    return {
        user: userInfo,
        setUser,
        clearUser
    }
}

export default useUserInfo;