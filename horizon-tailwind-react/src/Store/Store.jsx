import { configureStore } from "@reduxjs/toolkit";
import togSlice from "./Slice1.jsx"
import userSlice from "./Slice2.jsx"
import Package from "./Package"

export const Store=configureStore({
    reducer:{
        togData:togSlice,
        cred:userSlice,
        Package:Package
        

    }
})