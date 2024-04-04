import React, {useEffect, useState} from 'react';
import './App.css';
import Footer from "./component/common/Footer";
import {Outlet, Route, Routes} from "react-router-dom";
import Service from "./component/home/Service";
import Authorization from "./component/common/Authorization";
import Login from "./component/account/Login";
import Preview from "./component/preview/Preview";
import PreviewHeader from "./component/preview/PreviewHeader";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path='/' element={<Preview/>}/>
            <Route path='/service' element={
                <Authorization redirectTo='/account/login'>
                    <Service/>
                </Authorization>
            }/>
        </Routes>
      <Footer/>
    </div>
  );
}

export default App;
