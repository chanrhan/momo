import React, {useEffect, useState} from "react";
import {Link, Outlet, Route, Routes, useNavigate} from "react-router-dom";
import Login from "../account/Login";
import PreviewHeader from "./PreviewHeader";

function Preview(){
    const navigate = useNavigate();

    return (
        <div>
            <PreviewHeader/>
            <Outlet/>
        </div>
    )
}


export default Preview;