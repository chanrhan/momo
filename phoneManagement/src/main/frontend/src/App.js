import React, {useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Outlet, Route, Routes} from "react-router-dom";
import Service from "./components/home/Service";
import Authorization from "./components/common/Authorization";
import Login from "./components/account/Login";
import Preview from "./preview/Preview";
import Sale from "./service/sale/Sale";
import ManageCustomer from "./service/manage-customer/ManageCustomer";
import ReserveMessage from "./service/reserve-msg/ReserveMessage";
import AuthenticatedLayout from "./components/common/AuthenticatedLayout";
import Graph from "./service/graph/Graph";
import Chat from "./components/chat/Chat";
import FindUsername from "./components/account/FindUsername";
import FindPassword from "./components/account/FindPassword";
import PreviewHeader from "./preview/PreviewHeader";
import Profile from "./components/common/Profile";
import NotifStorage from "./components/common/NotifStorage";
import Signup from "./components/account/Signup";
import RoleSelector from "./components/account/role/RoleSelector";
import RoleDetail from "./components/account/role/RoleDetail";
import TestHeader from "./test/TestHeader";
import Admin from "./components/admin/Admin";
import AdminHeader from "./components/admin/AdminHeader";
import ModalContainer from "./modal/ModalContainer";
import NotifTest from "./test/NotifTest";
import ModalTest from "./test/ModalTest";
import RefTest from "./test/RefTest";
import MultipartTest from "./test/MultipartTest";
import CalendarTest from "./test/CalendarTest";
import GraphTest from "./test/GraphTest";

function App() {
  return (
    <div className="App">
        <ModalContainer/>
        <Routes>
            <Route path='/test' element={<TestHeader/>}>
                <Route path='notify' element={<NotifTest/>}/>
                <Route path='modal' element={<ModalTest/>}/>
                <Route path='ref' element={<RefTest/>}/>
                <Route path='multipart' element={<MultipartTest/>}/>
                <Route path='calendar' element={<CalendarTest/>}/>
                <Route path='graph' element={<GraphTest/>}/>
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
