import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import User from "../../css/user.module.css"
import useApi from "../hook/useApi";
import {authActions} from "../store/slices/authSlice";
import {setRefreshToken} from "../utils/Cookies";
import {UserFormBox} from "./module/UserFormBox";
import {UserFormBtnBox} from "./module/UserFormBtnBox";
import useInputField from "../hook/useInputField";
import {cmc} from "../utils/cm";
import useModal from "../hook/useModal";
import {ModalType} from "../common/modal/ModalType";

function Login(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {publicApi} = useApi();
    const modal = useModal();

    const [rememberMe, setRememberMe] = useState(false)

    const inputField = useInputField([
        {
            key: 'username',
            required: true,
            validateError: false
        },
        {
            key: 'password',
            required: true,
            validateError: false
        }
    ])


    const handleLogin = async (e)=>{
        let errorCnt = 0;
        if(!inputField.validateOne('username')){
            inputField.handleError('username','아이디를 다시 입력해주세요')
            errorCnt +=1;
        }
        if(!inputField.validateOne('password')){
            inputField.handleError('password','비밀번호를 다시 입력해주세요')
            errorCnt +=1;
        }
        // console.log(errorCnt)

        if(errorCnt > 0){
            return;
        }


        await publicApi.login(inputField.input).then(res=>{
            if(res.status === 200){
                dispatch(authActions.setAccessToken(res.headers.get('authorization')));
                setRefreshToken(res.headers.get('refreshtoken'));
                navigate('/service');
            }else if(res.status){
                inputField.handleError('username','아이디를 다시 입력해주세요')
                inputField.handleError('password','비밀번호를 다시 입력해주세요')
                modal.openModal(ModalType.SNACKBAR.Warning, {
                    msg: "아이디 혹은 비밀번호가 일치하지 않습니다."
                });
            }
        })
    }

    const handleRememberMe = ()=>{
        setRememberMe(!rememberMe);
    }

    return (
        <UserFormBox title='로그인'>
            <ul className={User.form_list}>
                <li className={`${User.form_item} ${inputField.error.username && cmc(User.error)}`}>
                    <label htmlFor="id" className={`${User.form_label} ${User.label}`}>아이디</label>
                    <div className={User.form_inp}>
                        <input type="text" name="username" className={`inp ` + User.inp} onChange={inputField.handleInput}/>
                    </div>
                    <p className={User.error_text}>{inputField.error.username}</p>
                </li>
                <li className={`${User.form_item} ${inputField.error.password && cmc(User.error)}`}>
                    <label htmlFor="pw" className={User.form_label}>비밀번호</label>
                    <div className={User.form_inp}>
                        <input type="password" name="password" className={`inp ` + User.inp} onChange={inputField.handleInput}/>
                    </div>
                    <p className={User.error_text}>{inputField.error.password}</p>
                </li>
            </ul>

            <div className={User.form_auto}>
                <input type="checkbox" id="auto" className={User.input} checked={rememberMe} onChange={handleRememberMe}/>
                <label htmlFor="auto" className={User.label}>자동로그인</label>
            </div>

            <UserFormBtnBox value='로그인' onClick={handleLogin}/>

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
    )
}

export default Login;