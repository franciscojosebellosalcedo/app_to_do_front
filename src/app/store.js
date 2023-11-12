import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feacture/user/userSlice";

export const store=configureStore({
    reducer:{
        user:userReducer
    }
});