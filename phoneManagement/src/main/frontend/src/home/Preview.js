import React from "react";
import {useNavigate} from "react-router-dom";

function Preview(){
    let navigate = useNavigate();
    return (
        <div>
            <h2 className='debug-page'>Preview Page</h2>
            <div className='preview-bg'></div>
            <button onClick={()=>{
                navigate('/account/login');
            }}>Login</button>
        </div>
    )
}

export default Preview;