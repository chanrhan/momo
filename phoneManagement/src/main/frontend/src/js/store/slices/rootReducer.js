import {combineReducers} from "@reduxjs/toolkit";
import {authReducer} from "./authSlice";
import {userReducer} from "./userSlice";
import {sseReducer} from "./sseSlice";
import {modalReducer} from "./modalSlice";
import {localReducer} from "./localStorageSlice";
import {gmdReducer} from "./gmdSlice";
import {topModalReducer} from "./TopModalSlice";

const rootReducer = combineReducers({
    authReducer,
    userReducer,
    sseReducer,
    modalReducer,
    localReducer,
    gmdReducer,
    topModalReducer
});

export default rootReducer;