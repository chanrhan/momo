import React, {useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Outlet, Route, Routes} from "react-router-dom";
import Service from "./home/Service";
import Authorization from "./common/Authorization";
import Login from "./account/Login";
import Preview from "./preview/Preview";
import Sale from "./service/sale/Sale";
import ManageCustomer from "./service/manage-customer/ManageCustomer";
import ReserveMessage from "./service/reserve-msg/ReserveMessage";
import AuthenticatedLayout from "./common/AuthenticatedLayout";
import Graph from "./service/graph/Graph";
import Chat from "./chat/Chat";
import FindUsername from "./account/FindUsername";
import FindPassword from "./account/FindPassword";
import PreviewHeader from "./preview/PreviewHeader";
import Profile from "./common/Profile";
import NotifStorage from "./common/NotifStorage";
import Signup from "./account/Signup";
import RoleSelector from "./account/role/RoleSelector";
import RoleDetail from "./account/role/RoleDetail";
import TestHeader from "./test/TestHeader";
import Admin from "./admin/Admin";
import AdminHeader from "./admin/AdminHeader";
import ModalContainer from "./modal/ModalContainer";
import NotifTest from "./test/NotifTest";
import ModalTest from "./test/ModalTest";
import RefTest from "./test/RefTest";

function App() {
  return (
    <div className="App">
        <ModalContainer/>
        <Routes>
            <Route path='/test' element={<TestHeader/>}>
                <Route path='notify' element={<NotifTest/>}/>
                <Route path='modal' element={<ModalTest/>}/>
                <Route path='ref' element={<RefTest/>}/>
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
                <Route path='/notification' element={<NotifStorage/>}/>
                <Route path='/service' element={<Service/>}>
                    <Route path='sale' element={<Sale/>}></Route>
                    <Route path='manage-customer/:category' element={<ManageCustomer/>}></Route>
                    <Route path='reserve-msg/:category' element={<ReserveMessage/>}></Route>
                    <Route path='graph' element={<Graph/>}></Route>
                </Route>
                <Route path='/chat' element={<Chat/>}/>
            </Route>
            <Route element={
                <Authorization redirectTo='/account/login'>
                    <AdminHeader/>
                </Authorization>
            }>
                <Route path='/admin' element={<Admin/>}>
                    <Route path='setting'></Route>
                </Route>
            </Route>
        </Routes>
    </div>
  );
}

export default App;
