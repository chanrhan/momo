import {Outlet} from "react-router-dom";
import SseHeader from "./SseHeader";
import {MainHeader} from "./MainHeader";
import "../../css/layout.module.css"
import "../../css/user.module.css"
import {Sidebar} from "./Sidebar";
import React from "react";

function MainLayout(){
    return (
        <div className='container'>
            {/*<SseHeader/>*/}
            <MainHeader/>
            <main>
                <Sidebar/>
                {/*<div id="contents">*/}
                {/*    <div className="approval">*/}
                {/*        <h2 className="approval_title">내 정보 설정</h2>*/}
                {/*        <p className="approval_text">승인이 늦어지는 경우 대표님에게 직접 문의해주세요.</p>*/}
                {/*        <span className="approval_stat">승인 대기중</span>*/}
                {/*    </div>*/}

                {/*    <a href="#" className="back_btn">이전 페이지</a>*/}

                {/*</div>*/}
                <Outlet/>
                {/*<hr/>*/}
                {/*<div className='d-flex flex-row'>*/}
                {/*    <Sidebar/>*/}
                {/*    <Outlet/>*/}
                {/*</div>*/}
                {/*<hr/>*/}
                {/*<Footer/>*/}
            </main>

        </div>
    )
}

export default MainLayout;