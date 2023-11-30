import { createSlice } from "@reduxjs/toolkit";

const data=JSON.parse(localStorage.getItem("data"));


const initialState = {
    data: {
        refressToken:null,
        accessToken:null,
        user:{
            _id:data ? data.user._id:null,
            email:data ? data.user.email:null,
        }
    },
}

export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.data=action.payload;
            const dataUser={
                refressToken: action.payload.refressToken,
                user:action.payload.user
            }
            localStorage.setItem("data",JSON.stringify(dataUser));
        },
        updateUser:(state,action)=>{
            state.data.user=action.payload;
        },
        removeUser:(state)=>{
            state.data={};
            localStorage.removeItem("data");
        }
    }
})

export const { setUser,updateUser ,removeUser} = userSlice.actions;

export default userSlice.reducer;