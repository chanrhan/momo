import {Outlet} from "react-router-dom";
import SseHeader from "./SseHeader";
import {MainHeader} from "./MainHeader";
import Layout from "../../css/layout.module.css"
import {Sidebar} from "./Sidebar";
import React, {useEffect} from "react";
import useApi from "../hook/useApi";
import {userActions} from "../store/slices/userSlice";
import {ObjectUtils} from "../utils/objectUtil";
import {useDispatch} from "react-redux";

function MainLayout(){
    const {userApi}  = useApi();
    const dispatch = useDispatch();

    const getUser = async ()=>{
        await userApi.getUser().then(({status,data})=>{
            if(status === 200 && !ObjectUtils.isEmpty(data)){
                dispatch(userActions.setUserInfo(data))
                // console.table(data)
            }
        })
    }

    useEffect(()=>{
        getUser()
    });

    return (
        <div className='container'>
            <SseHeader/>
            <MainHeader/>
            <main>
                <Sidebar/>
                <div className={Layout.contents}>
                    <Outlet/>
                </div>
            </main>

        </div>
)
}

export default MainLayout;