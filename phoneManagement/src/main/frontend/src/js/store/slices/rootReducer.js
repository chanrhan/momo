import {combineReducers} from "@reduxjs/toolkit";
import {authReducer} from "./authSlice";
import {userReducer} from "./userSlice";
import {sseReducer} from "./sseSlice";
import {modalReducer} from "./modalSlice";
import {localReducer} from "./localStorageSlice";
import {gmdReducer} from "./gmdSlice";
import {clickawayReducer} from "./clickawaySlice";

const rootReducer = combineReducers({
    authReducer,
    userReducer,
    sseReducer,
    modalReducer,
    localReducer,
    gmdReducer,
    clickawayReducer
});

export default rootReducer;