import {Navigate, useLocation} from "react-router-dom";
import {CheckToken} from "../js/utils/AuthUtils";


export default function Authorization({redirectTo, children}){
    const location = useLocation();
    const {isAuth} = CheckToken(location.key);


    if(isAuth === 'Success'){
        return <>{children}</>
    }else if(isAuth === 'Loading') {
        // return (
        //     <Loading/>
        // )
    }else {
        return <Navigate to={redirectTo}/>;
    }
}
