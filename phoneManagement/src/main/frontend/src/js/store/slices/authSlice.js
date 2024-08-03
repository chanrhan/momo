import {createSlice} from "@reduxjs/toolkit";

export const TOKEN_TIME_OUT = 1000 * 60 * 30; // 30분

const initialState = {
        authenticated: false,
        accessToken: null,
        expireTime: null
    };

export const authSlice = createSlice({
    name: 'authToken',
    initialState: initialState,
    reducers:{
        setAccessToken(state, action){
            // console.log(">>>>>>>>>>>>>> setAccessToken");
            // console.log(action);

            state.authenticated = true;
            state.accessToken = action.payload;
            state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
            return state;
            // console.log(`state.accessToken: ${state.accessToken}`)
        },
        delAccessToken(state){
            state.authenticated = false;
            state.accessToken = null;
            state.expireTime = null
        },
        clear: (state)=>{
            state = initialState
        }
    }
})

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;