import {Navigate, useLocation} from "react-router-dom";
import {AuthUtils, CheckToken} from "../js/utils/AuthUtils";
import Loading from "../js/common/module/Loading";


export default function Authorization({redirectTo, children}){
    const location = useLocation();
    const {isAuth} = CheckToken(location.key);


    if(isAuth === 'Success'){
        return <>{children}</>
    }else if(isAuth === 'Loading') {
        return (
            <Loading/>
        )
    }else {
        return <Navigate to={redirectTo}/>;
    }
}
