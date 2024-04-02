import React, {useEffect} from "react";
import axios from "axios";
import axiosInstance from "../axiosInstance";

function Header(){
    useEffect(()=>{
        axios.get('/csrf').then((res)=>{
            axiosInstance.defaults.headers["X-CSRF-TOKEN"] = res.data;
        }).catch(()=>{
            console.log("error")
        })
    },[])
    return (
        <div>
            <h1>MOMO TEST PAGE</h1>
        </div>
    )
}


export default Header;