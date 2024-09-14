import {createSlice} from "@reduxjs/toolkit";

const initialState = null

const topModalSLice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        addTopModal: (state, action)=>{
            return action.payload
        },
        clearTopModal: (state)=>{
            return null;
        }
    }
});

export const topModalReducer = topModalSLice.reducer;
export const {addTopModal, clearTopModal} = topModalSLice.actions;