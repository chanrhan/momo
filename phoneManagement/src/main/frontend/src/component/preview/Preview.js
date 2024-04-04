import React, {useEffect, useState} from "react";
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import Login from "../account/Login";
import PreviewHeader from "./PreviewHeader";

function Preview(){
    const navigate = useNavigate();

    return (
        <div>
            <Routes>
                <Route path='' element={<PreviewHeader/>}/>
                <Route path='/account/login' element={<Login/>}/>
            </Routes>
        </div>
    )
}


export default Preview;