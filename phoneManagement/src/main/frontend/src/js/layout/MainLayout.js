import {Outlet} from "react-router-dom";
import SseHeader from "./SseHeader";
import {MainHeader} from "./MainHeader";
import Layout from "../../css/layout.module.css"
import {Sidebar} from "./Sidebar";
import React, {useEffect, useMemo} from "react";
import useApi from "../hook/useApi";
import {userActions} from "../store/slices/userSlice";
import {ObjectUtils} from "../utils/objectUtil";
import {useDispatch, useSelector} from "react-redux";
import {WaitingApproval} from "./WaitingApproval";

function MainLayout(){
    const {userApi}  = useApi();
    const dispatch = useDispatch();
    const userInfo = useSelector(state=>state.userReducer);

    const getUser = async ()=>{
        await userApi.getUser().then(({status,data})=>{
            if(status === 200 && !ObjectUtils.isEmpty(data)){
                dispatch(userActions.setUserInfo(data))
                console.table(data)
            }
        })
    }

    useEffect(()=>{
        getUser()
    },[]);

    return (
        <div className='container'>
            <SseHeader/>
            <MainHeader/>
            <main>
                <Sidebar/>
                <div className={Layout.contents}>
                    {
                        (userInfo && userInfo.role && userInfo.role !== 'NONE') ?
                            <Outlet/> : <WaitingApproval/>
                    }

                </div>
            </main>

        </div>
)
}

export default MainLayout;