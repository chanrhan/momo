import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    id: null,
    name: null,
    role: null,
    nickname: null,
    tel: null,
    email: null,
    pfp: null,
    corp_nm: null,
    shop_nm: null,
    shop_addr: null,
}

export const userSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers:{
        setUserInfo: (state, action)=>{
            state = action.payload;
            return state;
            // let user = action.payload;
            // state.id = user.id;
            // state.name = user.name;
            // state.role = user.role;
            // state.nickname = user.nickname;
            // state.tel = user.tel;
            // state.email = user.email;
            // state.corp_nm = user.corp_nm;
            // state.shop_nm = user.shop_nm;
        },
        deleteUserInfo: (state)=>{
            state = initialState;
        }
    }
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;