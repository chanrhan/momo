import {createSlice} from "@reduxjs/toolkit";

export const localSlice = createSlice({
    name: 'local_storage',
    initialState: {
        unreadNote: 0
    },
    reducers:{
        updateUnreadNote: (state, action)=>{
            state.unreadNote = action.payload;
        }
    }
});

export const localReducer = localSlice.reducer;
export const localActions = localSlice.actions;