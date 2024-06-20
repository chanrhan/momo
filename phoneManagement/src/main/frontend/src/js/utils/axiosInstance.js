import axios from "axios";
import {useSelector} from "react-redux";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10000,
    headers: {
        "Content-Type": `application/json`,
        "Accept": "application/json",
        "Access-Control-Allow-Origin": `http://localhost:3000`,
        'Access-Control-Allow-Credentials':"true",
    },
    withCredentials: true,
});


export default axiosInstance;
