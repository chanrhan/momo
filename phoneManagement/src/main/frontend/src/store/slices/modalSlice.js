import {createSlice} from "@reduxjs/toolkit";

const initialState = []

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state,action)=>{
            const {modalName, type, props} = action.payload;
            if(state.some(value=>(modalName === value.modalName))){
                return state;
            }
            return state.concat({modalName, type, props})
        },
        closeModal: (state, action)=>{
            const modalName = action.payload;
            return state.filter(value=>(value.modalName !== modalName));
        }
    }
});

export const modalReducer = modalSlice.reducer;
export const {openModal, closeModal} = modalSlice.actions;