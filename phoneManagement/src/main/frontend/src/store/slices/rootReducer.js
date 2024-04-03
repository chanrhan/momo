import {combineReducers} from "@reduxjs/toolkit";
import {authReducer} from "./authSlice";

const rootReducer = combineReducers({
    authReducer
});

export default rootReducer;