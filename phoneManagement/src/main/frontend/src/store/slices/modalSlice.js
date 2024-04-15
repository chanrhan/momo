import {createSlice} from "@reduxjs/toolkit";

const initialState = []

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state,action)=>{
            const {type, props} = action.payload;
            return state.concat({type, props})
        },
        closeModal: (state)=>{
            state.pop();
        }
    }
});

export const modalReducer = modalSlice.reducer;
export const {openModal, closeModal} = modalSlice.actions;