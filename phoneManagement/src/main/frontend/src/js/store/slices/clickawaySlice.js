import {createSlice} from "@reduxjs/toolkit";

const initialState = []

const clickawaySlice = createSlice({
    name: 'clickaway',
    initialState,
    reducers: {
        push: (state,action)=>{
            state.push(action.payload)
            return state;
        },
        pop: (state)=>{
            if(state.length > 0){
                state.splice(state.length-1,1);
            }
            return state;
        }
    }
});

export const clickawayReducer = clickawaySlice.reducer;
export const clickawayActions = clickawaySlice.actions;