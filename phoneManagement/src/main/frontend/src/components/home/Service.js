import {Outlet} from "react-router-dom";

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