import {Link, Outlet, useNavigate} from "react-router-dom";
import React from "react";

function PreviewHeader(){
    const navigate = useNavigate();
    return (
        <div id='preview-header'>
            <h2 className='debug-page'>Preview Header</h2>
            <div className='row-cols-auto'>
                <Link to='/account/login'>
                    <button className='btn btn-outline-primary ms-2'>로그인</button>
                </Link>
                <Link to='/account/signup'>
                    <button className='btn btn-outline-primary ms-2'>무료로 시작하기</button>
                </Link>
            </div>
            <hr/>
            <Outlet/>
        </div>
    )
}

export default PreviewHeader;