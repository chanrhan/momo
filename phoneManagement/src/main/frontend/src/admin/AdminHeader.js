import {Outlet, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getUserInfo} from "../api/AccountApi";
import {userActions} from "../store/slices/userSlice";

function AdminHeader(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {accessToken} = useSelector(state=>state.authReducer);

    useEffect(()=>{
        const updateUserInfo = async ()=>{
            const {status, data} = await getUserInfo(accessToken);
            // console.log(data)
            if(status === 200){
                dispatch(userActions.setUserInfo(data));
                if(data.role !== 'ADMIN'){
                    alert("권한이 없습니다")
                    navigate('/service');
                }
            }
        };
        if(accessToken != null){
            updateUserInfo();
        }
    }, [accessToken]);

    return (
        <div>
            <h3>Admin Header</h3>
            <Outlet/>
        </div>
    )
}

export default AdminHeader;