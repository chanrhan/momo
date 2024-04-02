import {useState} from "react";
import {login} from "../utils/api";

function Login(){
    console.log("LOGIN");
    let [loginInput, setLoginInput] = useState({
        username: "",
        password: ""
    })

    const handlerInputChange = (e)=>{
        setLoginInput((prev)=>(
            {
                ...prev, [e.target.name]:e.target.value
            }
        ));
    }

    const onLogin = async(e)=>{
        e.preventDefault();
        const {data, status, error} = login(loginInput);
        console.log(data)
        console.log(status)
        console.log(error)
    }

    return (
        <div>
            <h3 className='debug-page'>Login Page</h3>

            <br/>
            <input type="username" className='form-control' id='username' name='username' value={loginInput.username} placeholder="ID" onChange={handlerInputChange} required/>
            <br/>
            <input type="password" className='form-control' id='password' name='password' value={loginInput.password} placeholder="PASSWORD" onChange={handlerInputChange} required/>
            <br/>
            <button type='submit' onClick={onLogin}>LOGIN</button>
        </div>
    )
}

export default Login;