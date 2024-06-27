import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import User from "../../css/user.module.css"
import useApi from "../hook/useApi";
import {authActions} from "../store/slices/authSlice";
import {setRefreshToken} from "../utils/Cookies";
import {UserFormBox} from "./module/UserFormBox";
import {UserFormBtnBox} from "./module/UserFormBtnBox";

function Login(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {publicApi} = useApi();

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
            await publicApi.login(loginInput).then(res=>{
                if(res.status === 200){
                    // console.log(`response.jwtToken : ${response.jwt}`)
                    dispatch(authActions.setAccessToken(res.jwt.access_token));
                    setRefreshToken(res.jwt.refresh_token);
                    navigate('/service');
                }else{
                    handleLoginError(res.json);
                }
            })

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
        <UserFormBox title='로그인'>
            <ul className={User.form_list}>
                <li className={`${User.form_item} ${User.li}`}>
                    <label htmlFor="id" className={`${User.form_label} ${User.label}`}>아이디</label>
                    <div className={User.form_inp}>
                        <input type="text" id="id" className={`inp ` + User.inp}/>
                    </div>
                    <p className="error_text">아이디를 입력해주세요.</p>
                </li>
                <li className={User.form_item}>
                    <label htmlFor="pw" className={User.form_label}>비밀번호</label>
                    <div className={User.form_inp}>
                        <input type="password" id="pw" className={`inp ` + User.inp}/>
                    </div>
                    <p className="error_text">비밀번호를 입력해주세요.</p>
                </li>
            </ul>

            <div className={User.form_auto}>
                <input type="checkbox" id="auto" className={User.input} checked/>
                <label htmlFor="auto" className={User.label}>자동로그인</label>
            </div>

            <UserFormBtnBox value='로그인'/>

            <ul className={`${User.user_link} ${User.link_find}`}>
                <li className={User.li}>
                    <Link to='/account/signup' className={User.a}>
                        회원가입
                    </Link>
                </li>
                <li className={User.li}>
                    <Link to='/account/find-username' className={User.a}>
                        아이디 찾기
                    </Link>
                </li>
                <li className={User.li}>
                    <Link to='/account/find-password' className={User.a}>
                        비밀번호 찾기
                    </Link>
                </li>
            </ul>
        </UserFormBox>
        // <div>
        //     <h3 className='debug-page'>Login Page</h3>
        //
        //     <div>
        //         <input type="username" className='mt-1' id='username' name='username' value={loginInput.username} placeholder="ID" onChange={handlerInputChange} required/>
        //         <br/>
        //         <input type="password" className='mt-1' id='password' name='password' value={loginInput.password} placeholder="PASSWORD" onChange={handlerInputChange} required/>
        //         <br/>
        //         {
        //             error && <p className='text-danger'>{error}</p>
        //         }
        //     </div>
        //     <button className='btn btn-outline-primary mt-3 ms-2' type='button' onClick={handleLogin}>로그인</button>
        //
        //     <div className='d-flex flex-row mt-2 justify-content-center'>
        //         <Link to='/account/signup'>
        //             <button className='btn btn-outline-secondary ms-2'>회원가입</button>
        //         </Link>
        //         <Link to='/account/find-username'>
        //             <button className='btn btn-outline-secondary ms-2'>아이디 찾기</button>
        //         </Link>
        //         <Link to='/account/find-password'>
        //             <button className='btn btn-outline-secondary ms-2'>비밀번호 찾기</button>
        //         </Link>
        //     </div>
        //
        // </div>
    )
}

export default Login;