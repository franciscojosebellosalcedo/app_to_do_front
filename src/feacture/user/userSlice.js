import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {},
}

export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.data=action.payload;
            localStorage.setItem("token",action.payload.refressToken);
        }
    }
})

export const { setUser } = userSlice.actions;

export default userSlice.reducer;