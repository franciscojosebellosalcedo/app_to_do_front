import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feacture/user/userSlice";
import viewActiveReducer from "../feacture/viewActive/viewActiveSlice";
import workAreaReducer from "../feacture/workArea/workAreaSlice";
import thunk from "redux-thunk";

export const store=configureStore({
    reducer:{
        user:userReducer,
        viewActive:viewActiveReducer,
        workArea:workAreaReducer
    },
    middleware:[thunk]
});