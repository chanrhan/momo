import axiosInstance from "../axiosInstance";
import {Form} from "react-router-dom";

export const login = (user) => {
    const {username, password} = user;

    axiosInstance.post("/account/login", {
        username: username,
        password: password
    }).then(res=>{
        return {status: true, res: res.data}
    }).catch(e=>{
        return {status: false, res: e}
    });
}