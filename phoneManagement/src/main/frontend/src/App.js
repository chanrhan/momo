import React, {useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Outlet, Route, Routes} from "react-router-dom";
import Service from "./component/home/Service";
import Authorization from "./component/common/Authorization";
import Login from "./component/account/Login";
import Preview from "./component/preview/Preview";
import Sale from "./component/service/sale/Sale";
import ManageCustomer from "./component/service/manage-customer/ManageCustomer";
import ReserveMessage from "./component/service/reserve-msg/ReserveMessage";
import AuthenticatedLayout from "./component/common/AuthenticatedLayout";
import Graph from "./component/service/graph/Graph";
import Chat from "./chat/Chat";
import FindUsername from "./component/account/FindUsername";
import FindPassword from "./component/account/FindPassword";
import PreviewHeader from "./component/preview/PreviewHeader";
import Profile from "./component/common/Profile";
import Notification from "./component/common/Notification";
import Signup from "./component/account/Signup";
import RoleSelector from "./component/account/role/RoleSelector";
import RoleDetail from "./component/account/role/RoleDetail";
import Test from "./test/Test";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path='/test' element={<Test/>}>

            </Route>
            <Route element={<PreviewHeader/>}>
                <Route path='/' element={<Preview/>}/>
                <Route path='/account/login' element={<Login/>}/>
                <Route path='/account/signup' element={<Signup/>}/>
                <Route path='/account/find-username' element={<FindUsername/>}/>
                <Route path='/account/find-password' element={<FindPassword/>}/>
            </Route>

            <Route path='/account/role' element={
                <Authorization redirectTo='/account/login'>
                    <RoleSelector/>
                </Authorization>
            }>
            </Route>
            <Route path='/account/role/:role' element={
                <Authorization redirectTo='/account/login'>
                    <RoleDetail/>
                </Authorization>
            }></Route>

            <Route element={
                <Authorization redirectTo='/account/login'>
                    <AuthenticatedLayout/>
                </Authorization>
            }>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/notification' element={<Notification/>}/>
                <Route path='/service' element={<Service/>}>
                    <Route path='sale' element={<Sale/>}></Route>
                    <Route path='manage-customer/:category' element={<ManageCustomer/>}></Route>
                    <Route path='reserve-msg/:category' element={<ReserveMessage/>}></Route>
                    <Route path='graph' element={<Graph/>}></Route>
                </Route>
                <Route path='/chat' element={<Chat/>}/>
            </Route>
        </Routes>
    </div>
  );
}

export default App;
