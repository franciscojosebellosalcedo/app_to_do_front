import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feacture/user/userSlice";
import viewActiveReducer from "../feacture/viewActive/viewActiveSlice";
import workAreaReducer from "../feacture/workArea/workAreaSlice";
import boardReducer from "../feacture/board/boardSlice";
import thunk from "redux-thunk";

export const store=configureStore({
    reducer:{
        user:userReducer,
        viewActive:viewActiveReducer,
        workArea:workAreaReducer,
        board:boardReducer,
    },
    middleware:[thunk]
});