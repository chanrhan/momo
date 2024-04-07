import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'userInfo',
    initialState: {
        id: null,
        name: null,
        role: null,
        nickname: null,
        // pfp: null,
        corp_nm: null,
        shop_nm: null
    },
    reducers:{
        setUserInfo(state, action){
            let user = action.payload;
            state.id = user.id;
            state.name = user.name;
            state.role = user.role;
            state.nickname = user.nickname;
            // state.pfp = user.pfp;
            state.corp_nm = user.corp_nm;
            state.shop_nm = user.shop_nm;
        },
        deleteUserInfo(state){
            state.id = null;
            state.name = null;
            state.role = null;
            state.nickname = null;
            // state.pfp = null;
            state.corp_nm = null;
            state.shop_nm = null;
        }
    }
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;