import React, {useEffect} from "react";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import {useNavigate} from "react-router-dom";

function Header(){
    const navigate = useNavigate();

    // csrf 처리 필요 X
    // useEffect(()=>{
    //     axios.get('/csrf').then((res)=>{
    //         axiosInstance.defaults.headers["X-CSRF-TOKEN"] = res.data.token;
    //         // console.log("headers: "+axiosInstance.defaults.headers["X-CSRF-TOKEN"])
    //     }).catch((e)=>{
    //         console.log("error"+e)
    //     })
    // },[])
    const handleLogout = e=>{
        navigate('/');
    }

    return (
        <div>
            <h1 onClick={()=>{
                navigate('/');
            }}>MOMO TEST PAGE</h1>
            <button onClick={handleLogout}>LOGOUT</button>
        </div>
    )
}


export default Header;