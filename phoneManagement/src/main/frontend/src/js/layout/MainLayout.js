import {Outlet} from "react-router-dom";
import SseHeader from "./SseHeader";
import {MainHeader} from "./MainHeader";
import Layout from "../../css/layout.module.css"
import {Sidebar} from "./Sidebar";
import React from "react";

function MainLayout(){
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