import {combineReducers} from "@reduxjs/toolkit";
import {authReducer} from "./authSlice";
import {userReducer} from "./userSlice";
import {sseReducer} from "./sseSlice";

const rootReducer = combineReducers({
    authReducer,
    userReducer,
    sseReducer
});

export default rootReducer;