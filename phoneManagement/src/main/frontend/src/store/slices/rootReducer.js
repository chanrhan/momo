import {combineReducers} from "@reduxjs/toolkit";
import {authReducer} from "./authSlice";
import {userReducer} from "./userSlice";

const rootReducer = combineReducers({
    authReducer,
    userReducer
});

export default rootReducer;