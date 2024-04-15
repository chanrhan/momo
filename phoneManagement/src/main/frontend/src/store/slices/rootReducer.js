import {combineReducers} from "@reduxjs/toolkit";
import {authReducer} from "./authSlice";
import {userReducer} from "./userSlice";
import {sseReducer} from "./sseSlice";
import {modalReducer} from "./modalSlice";

const rootReducer = combineReducers({
    authReducer,
    userReducer,
    sseReducer,
    modalReducer
});

export default rootReducer;