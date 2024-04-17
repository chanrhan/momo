import {createSlice} from "@reduxjs/toolkit";

const initialState = []

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state,action)=>{
            const {type, props} = action.payload;
            if(state.some(value=>(type === value.type))){
                return state;
            }
            return state.concat({type, props})
        },
        closeModal: (state, action)=>{
            const type = action.payload;
            return state.filter(value=>(value.type !== type));
        }
    }
});

export const modalReducer = modalSlice.reducer;
export const {openModal, closeModal} = modalSlice.actions;