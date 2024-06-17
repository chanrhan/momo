import React, {useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import ModalContainer from "./components/modal/ModalContainer";
import {LoginHeader} from "./components/header/LoginHeader";
import {Helmet} from "react-helmet-async";
import {Route, Routes} from "react-router-dom";
import Preview from "./components/preview/Preview";
import Login from "./components/account/Login";
import Signup from "./components/account/Signup";
import FindUsername from "./components/account/FindUsername";
import FindPassword from "./components/account/FindPassword";

function App() {
  return (
    <div className="App">
        <Helmet>
            <title>My Title</title>
            <meta name='viewport' content="width=device-width, initial-scale=1, shrink-to-fit=yes"/>
        </Helmet>
        <ModalContainer/>
        <Routes>
            <Route element={<LoginHeader/>}>
                <Route path='/' element={<Preview/>}/>
                <Route path='/account/login' element={<Login/>}/>
                <Route path='/account/signup' element={<Signup/>}/>
                <Route path='/account/find-username' element={<FindUsername/>}/>
                <Route path='/account/find-password' element={<FindPassword/>}/>
            </Route>
        </Routes>
    </div>
  );
}

export default App;
