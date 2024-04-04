import {useState} from "react";
import {login} from "../../utils/api";
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import {loginUser} from "../../api/Auth";
import {useDispatch} from "react-redux";
import {authActions} from "../../store/slices/authSlice";
import {setRefreshToken} from "../../utils/Cookies";
import Signup from "./Signup";
import FindUsername from "./FindUsername";
import FindPassword from "./FindPassword";

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
            const response = await loginUser(loginInput);
            if(response.status === 200){
                // console.log(`response.jwtToken : ${response.jwtToken}`)
                dispatch(authActions.setAccessToken(response.jwtToken.access_token));
                setRefreshToken(response.jwtToken.refresh_token);


                navigate('/home');
            }else{
                handleLoginError(response.json);
            }
        }catch (error){
            handleLoginError('Login failed:',error.response ? error.response.data : error.message);
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

            <br/>
            <input type="username" className='form-control' id='username' name='username' value={loginInput.username} placeholder="ID" onChange={handlerInputChange} required/>
            <br/>
            <input type="password" className='form-control' id='password' name='password' value={loginInput.password} placeholder="PASSWORD" onChange={handlerInputChange} required/>
            <br/>
            {
                error && <p className='text-danger'>{error}</p>
            }
            <button type='submit' onClick={handleLogin}>로그인</button>

            <button>
                <Link to='/account/find-username'>아이디 찾기</Link>
            </button>
            <button>
                <Link to='/account/find-password'>비밀번호 찾기</Link>
            </button>

            <Routes>
                <Route path='/account/signup' element={<Signup/>}/>
                <Route path='/account/find-username' element={<FindUsername/>}/>
                <Route path='/account/find-password' element={<FindPassword/>}/>
            </Routes>
        </div>
    )
}

export default Login;