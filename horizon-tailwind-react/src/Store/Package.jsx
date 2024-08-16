import { createSlice } from "@reduxjs/toolkit";

const Package= createSlice({
    name:"Package",
    initialState:[],
    reducers:{
        AddPackage:(state,action)=>{
            return [...action.payload]

        }
    }
})
export const {AddPackage}=Package.actions;
export default Package.reducer;
