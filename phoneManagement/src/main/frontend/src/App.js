import React, {useEffect, useState} from 'react';
import './App.css';
import {Outlet, Route, Routes} from "react-router-dom";
import Service from "./component/home/Service";
import Authorization from "./component/common/Authorization";
import Login from "./component/account/Login";
import Preview from "./component/preview/Preview";
import Sale from "./component/sale/Sale";
import ManageCustomer from "./component/manage-customer/ManageCustomer";
import ReserveMessage from "./component/reserve-msg/ReserveMessage";
import AuthenticatedLayout from "./component/common/AuthenticatedLayout";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path='/' element={<Preview/>}>
                <Route path='/account/login' element={<Login/>}/>
            </Route>
            <Route element={
                <Authorization redirectTo='/account/login'>
                    <AuthenticatedLayout/>
                </Authorization>
            }>
                <Route path='/service' element={<Service/>}>
                    <Route path='sale' element={<Sale/>}></Route>
                    <Route path='manage-customer' element={<ManageCustomer/>}></Route>
                    <Route path='reserve-msg' element={<ReserveMessage/>}></Route>
                </Route>
            </Route>
        </Routes>
    </div>
  );
}

export default App;
