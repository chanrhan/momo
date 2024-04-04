import {Navigate, useLocation} from "react-router-dom";
import {CheckToken} from "../../auth/AuthUtils";
import Loading from "./Loading";


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
