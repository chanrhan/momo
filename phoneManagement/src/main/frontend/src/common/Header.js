import React, {useEffect, useState} from "react";
import axios, {HttpStatusCode} from "axios";
import {Link, useNavigate} from "react-router-dom";
import {authActions, authReducer} from "../store/slices/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {removeCookieToken} from "../utils/Cookies";
import {userActions} from "../store/slices/userSlice";
import useApi from "../utils/useApi";
import useEmitter from "../utils/useEmitter";
import {localActions} from "../store/slices/localStorageSlice";
import useModal from "../utils/useModal";
import {ModalType} from "../modal/ModalType";

function Header(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const emitter = useEmitter();
    const modal = useModal();

    const {userApi, saleApi, notifApi} = useApi();
    const {accessToken} = useSelector(state=>state.authReducer);
    const {unreadNote} = useSelector(state=>state.localReducer);

    const [keywordInput, setKeywordInput] = useState(null);
    const [searchList, setSearchList] = useState([]);

    useEffect(()=>{
        emitter.addEventListener('notif',onNotify)
    },[])

    useEffect(()=>{
        if(accessToken != null){
            userApi.getUserInfo().then(({status,data})=>{
                if(status === HttpStatusCode.Ok){
                    dispatch(userActions.setUserInfo(data));
                }
            })
        }
    }, [accessToken])

    const onNotify = (e)=>{
        notifApi.countUnreadNotif().then(({status,data})=>{
            if(status === HttpStatusCode.Ok){
                console.log("on notify")
                dispatch(localActions.updateUnreadNotif(data));
                modal.openModal(ModalType.SNACKBAR.Alert, {
                    msg: "새로운 알림이 도착했습니다"
                });
            }
        })
    }

    const handleLogout = e=>{
        dispatch(authActions.delAccessToken());
        removeCookieToken();
        navigate('/');
    }

    const handleKeywordInput = (e)=>{
        setKeywordInput(e.target.value);
    }

    const search = async (e)=>{
        if(e.keyCode === 13){
            await saleApi.fetchSale({
                keyword: keywordInput
            }).then(({status,data})=>{
                if(status === 200){
                    setSearchList(data);
                }
            })
        }
    }

    return (
        <div>
            <h1>MOMO TEST PAGE</h1>
            <button className='btn btn-outline-dark' onClick={handleLogout}>LOGOUT</button>
            <div className='d-flex flex-row align-items-center justify-content-center'>
                <div >
                    <Link to='/service'>
                        <button className='btn btn-outline-primary'>모모</button>
                    </Link>

                    <Link to='/chat'>
                        <button className='btn btn-outline-primary'>팀 채팅</button>
                    </Link>
                </div>
                <div className='p-2'>
                    <input className='form-control' list='search_result' type="search" placeholder='이름, 전화번호, 식별번호로 검색해보세요' onClick={handleKeywordInput} onKeyDown={search}/>
                    <datalist id='search_result'>
                        {
                            searchList.map((value,index)=>{
                                return <option key={index} ><HeaderSearchResult user={value}/></option>
                                // return <HeaderSearchResult key={index} user={value}/>
                            })
                        }
                    </datalist>
                </div>
                <Link to='/notification'>
                    <button className={`btn ${unreadNote > 0 ? 'btn-outline-danger':'btn-outline-dark'}`}>알림 {unreadNote > 0 && unreadNote}</button>
                </Link>
                <Link to='/profile'>
                    <button className='btn btn-outline-dark'>프로필</button>
                </Link>
            </div>
        </div>
    )
}

function HeaderSearchResult({user}){
    return (
        <div className='d-flex flex-row justify-content-center'>
            <p className='ms-2'>{user.cust_nm}</p>
            <p className='ms-2'>{user.cust_tel}</p>
            <p className='ms-2'>{user.cust_cd}</p>
            <p className='ms-5'>{user.actv_dt}</p>
        </div>
    )
}


export default Header;