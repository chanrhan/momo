import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./account/Login";
import Preview from "./home/Preview";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Home from "./home/Home";

function App() {
    let navigate = useNavigate();

  return (
    <div className="App">
        <Header/>
        {/*<ServerTest/>*/}

        <Routes>
            <Route path="/" element={<Preview/>}/>
            <Route path="/account/login" element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>
        </Routes>

        <Footer/>
    </div>
  );
}

function ServerTest(){
    const [user, setUser] = useState('');

    useEffect(()=>{
        axios.get('/api/test/react')
            .then((res)=>{
                setUser(res.data);
            })
    },[]);
    return (
        <div className='container'>
            <h4>Server Test Data</h4>
            <p>{user.id}</p>
            <p>{user.name}</p>
            <p>{user.age}</p>
        </div>
    )
}

export default App;
