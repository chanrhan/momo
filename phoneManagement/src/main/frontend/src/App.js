import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet-async";
import ModalContainer from "./js/modal/common/ModalContainer";
import {Route, Routes} from "react-router-dom";
import {AccountLayout} from "./js/layout/AccountLayout";
import Login from "./js/account/Login";
import {Signup} from "./js/account/Signup";
import {Role} from "./js/account/Role";
import {SelectShop} from "./js/account/SelectShop";
import MainLayout from "./js/layout/MainLayout";
import Authorization from "./common/Authorization";
import {RegisterCorp} from "./js/account/RegisterCorp";
import {RegisterShop} from "./js/account/RegisterShop";
import {FindUsername} from "./js/account/FindUsername";
import {FindPassword} from "./js/account/FindPassword";
import {Main} from "./js/service/Main";
import {ManageStaff} from "./js/staff/StaffManagement";
import {Profile} from "./js/profile/Profile";
import {Sale} from "./js/sale/Sale";
import {ManageCustomer} from "./js/customer/MangeCustomer";
import {Appointment} from "./js/customer/Appointment";
import {ReserveMessage} from "./js/reserve/ReserveMessage";
import {Graph} from "./js/analysis/Graph";
import {Statistics} from "./js/analysis/Statistics";
import {Administrator} from "./js/admin/Administrator";
import {Support} from "./js/account/Support";

function App() {
  return (
      <div className="App">
          <Helmet>
              <title>모모</title>
              <meta name='viewport' content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
          </Helmet>
          {/*<ModalContainer/>*/}
          <Routes>
              <Route element={<AccountLayout/>}>
                  {/*<Route path='/' element={<Preview/>}/>*/}
                  <Route path='/account/login' element={<Login/>}/>
                  <Route path='/account/signup' element={<Signup/>}/>

                  <Route path='/account/find-username' element={<FindUsername/>}/>
                  <Route path='/account/find-password' element={<FindPassword/>}/>
                  <Route path='/support' element={<Support/>}/>
              </Route>

              <Route path='/role' element={<Role/>}/>

              <Route element={
                  <AccountLayout/>
                  // <Authorization redirectTo='/account/login'>
                  //     <AccountLayout/>
                  // </Authorization>
              }>
                  <Route path='/role/staff' element={<SelectShop/>}/>
                  <Route path='/role/reps' element={<RegisterCorp/>}/>
              </Route>

              <Route path='/shop'>
                  <Route path='register' element={<RegisterShop/>}/>
              </Route>

              <Route element={
                  <MainLayout/>
                  // <Authorization redirectTo='/account/login'>
                  //     <ServiceLayout/>
                  // </Authorization>
              }>
                  <Route path='/service'>
                      <Route path='' element={<Main/>}/>
                      <Route path='sale' element={<Sale/>}/>
                      <Route path='manage' element={<ManageCustomer/>}/>
                      <Route path='appointment' element={<Appointment/>}/>
                      <Route path='reserve' element={<ReserveMessage/>}/>
                      <Route path='graph' element={<Graph/>}/>
                      <Route path='statistics' element={<Statistics/>}/>
                      <Route path='admin' element={<Administrator/>}/>
                  </Route>

                  <Route path='/staff' element={<ManageStaff/>}>

                  </Route>

                  <Route path='profile' element={<Profile/>}/>

              </Route>
          </Routes>

          <button type="button" className="chatbot_btn">챗봇</button>
      </div>
  );
}

export default App;
