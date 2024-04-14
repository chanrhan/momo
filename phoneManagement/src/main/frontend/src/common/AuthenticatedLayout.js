import Header from "./Header";
import Footer from "./Footer";
import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar";
import SseHeader from "./SseHeader";

function AuthenticatedLayout(){
    return (
        <div>
            <SseHeader/>
            <Header/>
            <hr/>
            <div className='d-flex flex-row'>
                <Sidebar/>
                <Outlet/>
            </div>
            <hr/>
            <Footer/>
        </div>
    )
}

export default AuthenticatedLayout;