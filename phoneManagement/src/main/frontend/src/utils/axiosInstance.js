import axios from "axios";
import {useSelector} from "react-redux";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10000,
    headers: {
        "Content-Type": `application/json`,
        "Authorization": localStorage.getItem('access_token'),
        "Accept": "application/json",
        "Access-Control-Allow-Origin": `http://localhost:3000`,
        'Access-Control-Allow-Credentials':"true",
    },
    withCredentials: true,
});

// axiosInstance.interceptors.request.use(config=>{
//     config.headers["authorization"] = localStorage.getItem("accessToken");
//     config.headers["refresh-token"] = localStorage.getItem("refreshToken");
//     return config;
// })
//
// axiosInstance.interceptors.response.use(res=>{
//     if(res.headers["authorization"]){
//         localStorage.removeItem("accessToken");
//         console.log("interceptor response token: "+ res.headers["authorization"])
//         localStorage.setItem("accessToken", res.headers["authorization"]);
//     }else if(res.data.error === "Invalid token"){
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
//     }
//     return res;
// })

export default axiosInstance;
