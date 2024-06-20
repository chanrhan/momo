import React, {useEffect, useState} from "react";
import {Link, Outlet, Route, Routes, useNavigate} from "react-router-dom";
import PreviewHeader from "./PreviewHeader";

function Preview(){
    const navigate = useNavigate();

    return (
        <div id='preview'>
            <h3>Preview Page</h3>
            <div className='row-cols-auto'>
                <Link to='/account/login'>
                    <button className='btn btn-outline-primary ms-2'>로그인</button>
                </Link>
                <Link to='/account/signup'>
                    <button className='btn btn-outline-primary ms-2'>무료로 시작하기</button>
                </Link>
            </div>
        </div>
    )
}


export default Preview;