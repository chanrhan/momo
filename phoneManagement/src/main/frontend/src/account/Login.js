import {useState} from "react";
import {login} from "../utils/api";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../axiosInstance";

function Login(){
    const navigate = useNavigate();

    let [loginInput, setLoginInput] = useState({
        username: "",
        password: ""
    })

    let [error, setError] = useState('');

    const handlerInputChange = (e)=>{
        setLoginInput((prev)=>(
            {
                ...prev, [e.target.name]:e.target.value
            }
        ));
    }

    const handleLogin = async (e)=>{
        e.preventDefault();
        // const {status, res} = await login(loginInput);
        // if(status){
        //     navigate('/home');
        // }else{
        //     console.error('Login failed:',error.response ? error.response.data : error.message);
        //     setError("Invalid username or password");
        // }
        try{
            const reesponse = await axiosInstance.post('/account/login',loginInput);
            navigate('/home');
        }catch (error){
            console.error('Login failed:',error.response ? error.response.data : error.message);
            setError("Invalid username or password");
        }

    }

    return (
        <div>
            <h3 className='debug-page'>Login Page</h3>

            <br/>
            <input type="username" className='form-control' id='username' name='username' value={loginInput.username} placeholder="ID" onChange={handlerInputChange} required/>
            <br/>
            <input type="password" className='form-control' id='password' name='password' value={loginInput.password} placeholder="PASSWORD" onChange={handlerInputChange} required/>
            <br/>
            {
                error && <p className='text-danger'>{error}</p>
            }
            <button type='submit' onClick={handleLogin}>LOGIN</button>
        </div>
    )
}

export default Login;