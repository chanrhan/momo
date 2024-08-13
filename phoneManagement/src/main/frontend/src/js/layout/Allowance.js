import useUserInfo from "../hook/useUserInfo";
import {Navigate} from "react-router-dom";

export function Allowance({condition, redirectTo, children}){

    if(condition()){
        return <>{children}</>
    }else{
        return <Navigate to={redirectTo}/>
    }
}