import AutoRouter from "../../Route/AutoRouter";
import Header from "../common/Header";
import Footer from "../common/Footer";
import {Outlet} from "react-router-dom";

function Service(){
    return (
        <div>
            <h3 className='debug-page'>Service Page</h3>
            <Outlet/>
        </div>
    )
}

export default Service;