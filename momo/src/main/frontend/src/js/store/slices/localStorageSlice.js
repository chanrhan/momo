import {createSlice} from "@reduxjs/toolkit";

export const localSlice = createSlice({
    name: 'local_storage',
    initialState: {
        unreadNotif: 0,
        brNo: null,
        corpNm: null
    },
    reducers:{
        updateUnreadNotif: (state, action)=>{
            state.unreadNote = action.payload;
        },
        setCorpName: (state, action)=>{
            state.brNm = action.payload;
            return state;
        },
        setBrno: (state, action)=>{
            state.brNo = action.payload;
            return state;
        }
    }
});

export const localReducer = localSlice.reducer;
export const localActions = localSlice.actions;