import { createSlice } from "@reduxjs/toolkit";
// import useSlice from "./Slice2"

const togSlice=createSlice({
    name:'tog',
    initialState:false,
    reducers:{
        add:(state,action)=>{
            return state=action.payload;
            
        }
    }
})
export  const {add}=togSlice.actions;
export default togSlice.reducer;