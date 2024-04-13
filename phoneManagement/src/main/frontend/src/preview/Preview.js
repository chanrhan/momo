import React, {useEffect, useState} from "react";
import {Link, Outlet, Route, Routes, useNavigate} from "react-router-dom";
import Login from "../account/Login";
import PreviewHeader from "./PreviewHeader";

function Preview(){
    const navigate = useNavigate();

    return (
        <div id='preview'>
            <h3 className='debug-page'>Preview Page</h3>
            <div className='preview-bg'></div>
        </div>
    )
}


export default Preview;