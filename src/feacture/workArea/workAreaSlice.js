import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    data: []
}

export const workAreaSlice=createSlice({
    name:"workArea",
    initialState,
    reducers:{
        setWorkAreas:(state,action)=>{
            state.data=action.payload;
        },
        addNewWorkArea:(state,action)=>{
            state.data=[action.payload,...state.data];
        },
        removeWorkArea:(state,action)=>{
            state.data=state.data.filter((workArea)=>workArea?._id !== action.payload);
        },
        addNewChangesWorkArea:(state,action)=>{
            const index=state.data.findIndex((workArea)=>workArea._id===action.payload._id);
            state.data[index].name=action.payload.name;
            state.data[index].description=action.payload.description;
        },
        changeStatusIsFavoriteBoard:(state,action)=>{
            const data=action.payload;
            const workAreaFound=state.data.find((wa)=>wa._id===data.idWorkArea);
            const boardFound=workAreaFound.boards.find((b)=>b._id===data.idBoard);
            boardFound.isFavorite=data.newStatus;
        },
        addNewBoard:(state,action)=>{
           const index= state.data.findIndex((workArea)=>workArea._id===action.payload._id);
           state.data[index]?.boards.push(action.payload.newBoard);
        },
        removeOneBoard:(state,action)=>{

        }
    }
})

export const { setWorkAreas,addNewWorkArea,removeWorkArea,addNewBoard,addNewChangesWorkArea,changeStatusIsFavoriteBoard } = workAreaSlice.actions;

export default workAreaSlice.reducer;