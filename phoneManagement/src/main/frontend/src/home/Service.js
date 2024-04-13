import AutoRouter from "../Route/AutoRouter";
import Header from "../component/common/Header";
import Footer from "../component/common/Footer";
import {Outlet, useNavigate} from "react-router-dom";

function Service(){
    return (
        <div>
            <div className='container justify-content-center align-content-center'>
                <h3 className='debug-page'>Service Page</h3>
                <Outlet/>
            </div>
        </div>
    )
}

export default Service;