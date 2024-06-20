import {Link, Outlet} from "react-router-dom";
import "../../css/user.module.css"
import logo from "../../images/user/logo.png"

export function AccountLayout(){
    return (
        <div className='user'>
            <div className='container'>
                <header>
                    <h1 className="logo">
                        <Link to='/'><img src={logo} alt="momo"/></Link>
                    </h1>
                </header>
                <Outlet/>
                <footer>
                    <p className="copyright">COPYRIGHT(C) MOMO, INC. ALL RIGHTS RESERVED.</p>
                </footer>
            </div>
        </div>
    )
}