import {useState} from "react";
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {authActions} from "../store/slices/authSlice";
import {setRefreshToken} from "../utils/Cookies";
import Signup from "./Signup";
import FindUsername from "./FindUsername";
import FindPassword from "./FindPassword";
import {login} from "../api/AccountApi";

function Login(){
    const dispatch = useDispatch();
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
        try{
            const response = await login(loginInput);
            console.log(response)
            if(response.status === 200){
                console.log(`response.jwtToken : ${response.jwt}`)
                dispatch(authActions.setAccessToken(response.jwt.access_token));
                setRefreshToken(response.jwt.refresh_token);


                navigate('/service');
            }else{
                handleLoginError(response.json);
            }
        }catch (error){
            handleLoginError('Login failed:', error.response ? error.response.data : error.message);
        }

    }

    const handleLoginError = (error)=>{
        console.error(error);
        setError("Invalid username or password");
        setLoginInput((prev)=>(
            {
                ...prev, password: ''
            }
        ));
    }

    return (
        <div>
            <h3 className='debug-page'>Login Page</h3>

            <div>
                <input type="username" className='mt-1' id='username' name='username' value={loginInput.username} placeholder="ID" onChange={handlerInputChange} required/>
                <br/>
                <input type="password" className='mt-1' id='password' name='password' value={loginInput.password} placeholder="PASSWORD" onChange={handlerInputChange} required/>
                <br/>
                {
                    error && <p className='text-danger'>{error}</p>
                }
            </div>
            <button className='btn btn-outline-primary mt-3 ms-2' type='button' onClick={handleLogin}>로그인</button>

            <div className='d-flex flex-row mt-2 justify-content-center'>
                <Link to='/account/signup'>
                    <button className='btn btn-outline-secondary ms-2'>회원가입</button>
                </Link>
                <Link to='/account/find-username'>
                    <button className='btn btn-outline-secondary ms-2'>아이디 찾기</button>
                </Link>
                <Link to='/account/find-password'>
                    <button className='btn btn-outline-secondary ms-2'>비밀번호 찾기</button>
                </Link>
            </div>

        </div>
    )
}

export default Login;