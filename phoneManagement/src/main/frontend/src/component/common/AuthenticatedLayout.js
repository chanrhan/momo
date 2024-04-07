import Header from "./Header";
import Footer from "./Footer";
import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar";

function AuthenticatedLayout(){
    return (
        <div>
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