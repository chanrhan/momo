import {Outlet} from "react-router-dom";

export function LoginHeader(){
    return (
        <header>
            <h1 className="logo">
                <a href="#"><img src="images/user/logo.png" alt="momo"/></a>
            </h1>
            <Outlet/>
        </header>
    )
}