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
        addNewBoard:(state,action)=>{
           const index= state.data.findIndex((workArea)=>workArea._id===action.payload._id);
           state.data[index]?.boards.push(action.payload.newBoard);
        },
        remoseOneBoard:(state,action)=>{

        }
    }
})

export const { setWorkAreas,addNewWorkArea,removeWorkArea,addNewBoard } = workAreaSlice.actions;

export default workAreaSlice.reducer;