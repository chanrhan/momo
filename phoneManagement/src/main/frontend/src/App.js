import React, {useEffect, useState} from 'react';
import './App.css';
import Header from "./common/Header";
import Footer from "./common/Footer";
import {Route, Routes} from "react-router-dom";
import Preview from "./home/Preview";
import Login from "./account/Login";
import Home from "./home/Home";
import axiosInstance from "./utils/axiosInstance";
import axios from "axios";
import AutoRouter from "./Route/AutoRouter";




function App() {
  return (
    <div className="App">
      <Header/>

        <AutoRouter/>
        {/*<Routes>*/}
        {/*    <Route path='/' element={<Preview/>}/>*/}
        {/*    <Route path='/account/login' element={<Login/>}/>*/}
        {/*    <Route path='/home' element={<Home/>}/>*/}
        {/*</Routes>*/}
      <Footer/>
    </div>
  );
}

export default App;
