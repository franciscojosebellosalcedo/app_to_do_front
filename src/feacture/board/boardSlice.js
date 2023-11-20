import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {
        favorites:[],
    }
}

export const boardSlice=createSlice({
    name:"board",
    initialState,
    reducers:{
        setBoardsFavorites:(state,action)=>{
            state.data.favorites=action.payload;
        },
        addBoardFavorite:(state,action)=>{
            state.data.favorites.unshift(action.payload);
        },
        removeBoardFavorite:(state,action)=>{
            state.data.favorites.splice(state.data.favorites.findIndex((b)=>b._id===action.payload),1)
        }
    }
})

export const { setBoardsFavorites ,addBoardFavorite,removeBoardFavorite} = boardSlice.actions;

export default boardSlice.reducer;