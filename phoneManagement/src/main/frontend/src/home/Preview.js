import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import axiosInstance from "../axiosInstance";

function Preview(){
    let navigate = useNavigate();
    useEffect(()=>{
        axiosInstance.post('/post',{
            username: 'km151rs',
            password: '@gmlcks0915'
        }).then((res)=>{
            console.log(res.data);
        }).catch(e=>{
            console.log("post error: "+e)
        })
    },[])
    return (
        <div>
            <h2 className='debug-page'>Preview Page</h2>
            <div className='preview-bg'></div>
            <button onClick={()=>{
                navigate('/account/login');
            }}>Login</button>
        </div>
    )
}

export default Preview;