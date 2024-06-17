import React, {useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Outlet, Route, Routes} from "react-router-dom";
import Service from "./components/home/Service";
import Authorization from "./components/common/Authorization";
import Login from "./components/account/Login";
import AuthenticatedLayout from "./components/common/AuthenticatedLayout";
import Chat from "./components/chat/Chat";
import FindUsername from "./components/account/FindUsername";
import FindPassword from "./components/account/FindPassword";
import Profile from "./components/common/Profile";
import NotifStorage from "./components/common/NotifStorage";
import Signup from "./components/account/Signup";
import RoleSelector from "./components/account/role/RoleSelector";
import RoleDetail from "./components/account/role/RoleDetail";
import TestHeader from "./test/TestHeader";
import Admin from "./components/admin/Admin";
import AdminHeader from "./components/admin/AdminHeader";
import NotifTest from "./test/NotifTest";
import ModalTest from "./test/ModalTest";
import RefTest from "./test/RefTest";
import MultipartTest from "./test/MultipartTest";
import CalendarTest from "./test/CalendarTest";
import GraphTest from "./test/GraphTest";
import ExcelTest from "./test/ExcelTest";
import ModalContainer from "./components/modal/ModalContainer";
import PreviewHeader from "./components/preview/PreviewHeader";
import Preview from "./components/preview/Preview";
import Sale from "./components/sale/Sale";
import ManageCustomer from "./components/manage-customer/ManageCustomer";
import ReserveMessage from "./components/reserve-msg/ReserveMessage";
import Graph from "./components/graph/Graph";
import BulkUploadTest from "./test/BulkUploadTest";
import {RegexTest} from "./test/RegexTest";
import GMDSetting from "./components/admin/GMDSetting";
import ApiTest from "./test/ApiTest";
import ExceptionTest from "./test/ExceptionTest";
import FileUploadTest from "./test/FileUploadTest";
import AlimTalkTest from "./test/AlimTalkTest";

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
                <Route path='excel' element={<ExcelTest/>}/>
                <Route path='bulk' element={<BulkUploadTest/>}/>
                <Route path='regex' element={<RegexTest/>}/>
                <Route path='api' element={<ApiTest/>}/>
                <Route path='exception' element={<ExceptionTest/>}/>
                <Route path='file' element={<FileUploadTest/>}/>
                <Route path='alimtalk' element={<AlimTalkTest/>}/>
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
                    <Route path='setting' element={<GMDSetting/>}></Route>
                </Route>
            </Route>
        </Routes>
    </div>
  );
}

export default App;
