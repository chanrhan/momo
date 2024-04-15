import React, {useEffect, useState} from "react";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import {Link, useNavigate} from "react-router-dom";
import {authActions, authReducer} from "../store/slices/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {removeCookieToken} from "../utils/Cookies";
import {userActions} from "../store/slices/userSlice";
import {getUserInfo} from "../api/AccountApi";
import {getSaleList} from "../api/SaleApi";

function Header(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {accessToken} = useSelector(state=>state.authReducer);

    const [keywordInput, setKeywordInput] = useState(null);
    const [searchList, setSearchList] = useState([]);

    useEffect(()=>{
        if(accessToken != null){
            updateUserInfo();
        }
    }, [accessToken])

    const updateUserInfo = async ()=>{
        const {status, data} = await getUserInfo(accessToken);
        if(status === 200){
            dispatch(userActions.setUserInfo(data));
        }
    };


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
            const response = await getSaleList({
                keyword: keywordInput
            }, accessToken);
            if(response.status === 200){
                setSearchList(response.data);
            }
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
                    <button className='btn btn-outline-dark'>알림</button>
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