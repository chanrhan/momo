import {Route, Router, Routes} from "react-router-dom";
import Preview from "../home/Preview";
import Login from "../account/Login";
import Home from "../home/Home";
import React from "react";
import Authorization from "../common/Authorization";

const RouterInfo = [
    {path: '/', element: <Preview/>, withAuthorization: false},
    {path: '/account/login', element: <Login/>, withAuthorization: false},
    {path: '/home', element: <Home/>, withAuthorization: true}
];

const AutoRouter = () => {
    return (
        <div id='auto_router'>
            <Routes>
                {
                    RouterInfo.map((route) => {
                        return (
                            <Route key={route.path}
                                   path={route.path}
                                   element={
                                        route.withAuthorization ? (
                                            <Authorization
                                                redirectTo='/account/login'
                                            >
                                                {route.element}
                                            </Authorization>
                                        ) : (
                                            route.element
                                        )
                                   }
                            />
                        )
                    })
                }
            </Routes>
        </div>
    )
}

export default AutoRouter;