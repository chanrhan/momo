import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

const TIME_OUT = 300 * 1000;

const statusError = {
    status: false,
    json: {
        error: ["연결이 원활하지 않습니다. 잠시 후 다시 시도해 주세요"]
    }
}

export const requestRefreshToken = async (refreshToken)=>{
    const option = {
        headers: {
            'X-REFRESH-TOKEN': refreshToken
        }
    }
    // console.log(`requestToken refresh: ${option}`)
    const data = await axiosInstance.post('/api/v1/auth/refresh',{}, option)
        .catch(()=>{
            return statusError;
        })

    if(parseInt(Number(data.status) / 100) === 2){
        const status = data.status;

        const jwtToken = {
            access_token: data.headers.get('authorization'),
            refresh_token: data.headers.get('refreshtoken')
        }

        return {
            status,
            jwtToken
        }
    }else{
        return statusError;
    }

}

export const loginUser = async(user)=>{
    let {username, password} = user;
    const data = await axiosInstance.post('/api/v1/auth/login', {
        username: username,
        password: password
    }).catch(()=>{
        return statusError;
    })


    if(parseInt(Number(data.status) / 100) === 2){
        // const status = data.ok;
        const status = data.status;
        // const text = await data.text();
        // const json11 = text.length ? JSON.parse(text) : "";

        console.log(`response.headers.authorization : ${data.headers.get('authorization')}`)
        // for(let header of data.headers.entries()){
        //     console.log(header)
        // }

        const jwtToken = {
            access_token: data.headers.get('authorization'),
            refresh_token: data.headers.get('refreshtoken')
        }

        return {
            // status,
            status,
            // json11,
            jwtToken
        }
    }else{
        return statusError;
    }
}