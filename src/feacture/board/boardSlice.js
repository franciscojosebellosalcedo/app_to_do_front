import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {
        list:[],
        favorites:[],
    }
}

export const boardSlice=createSlice({
    name:"board",
    initialState,
    reducers:{
        setListBoards:(state,action)=>{
            state.data.list=action.payload;
        },
        setBoardsFavorites:(state,action)=>{
            state.data.favorites=action.payload;
        },
        addBoardFavorite:(state,action)=>{
            state.data.favorites.unshift(action.payload);
        },
        removeBoardFavorite:(state,action)=>{
            state.data.favorites.splice(state.data.favorites.findIndex((b)=>b._id===action.payload),1)
        },
        removeBoardsByWorkArea:(state,action)=>{
            const list=state.data.list;
            for (let i = 0; i < list.length; i++) {
                const index =list.findIndex((b)=>b.workArea._id===action.payload);
                list.splice(index,1);
            }
            const listFavorite=state.data.list;
            for (let i = 0; i < listFavorite.length; i++) {
                const index =listFavorite.findIndex((b)=>b.workArea._id===action.payload);
                listFavorite.splice(index,1);
            }
            state.data.list=list;
            state.data.favorites=listFavorite;
        },
    }
})

export const { setBoardsFavorites ,addBoardFavorite,removeBoardFavorite,setListBoards,removeBoardsByWorkArea} = boardSlice.actions;

export default boardSlice.reducer;