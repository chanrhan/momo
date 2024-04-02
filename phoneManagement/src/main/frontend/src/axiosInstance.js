import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 1000,
    headers: {
        "Content-Type": `application/json;charset=UTF-8`,
        // "Accept": "application/json",
        "Access-Control-Allow-Origin": `http://localhost:3000`,
        'Access-Control-Allow-Credentials':"true",
    },
    withCredentials: true,
});

export default axiosInstance;