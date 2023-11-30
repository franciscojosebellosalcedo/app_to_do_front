import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    listOpenDelete: [],
    openOptions: false,
    openWorksAreas: false,
    openModal: false,
    openModalFormBoard:false,
    openDeleteWorkArea: false,
    openSearchNavBar:false,
    openMenuUser:false
  },
};

export const wiewActiveSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    resetAllViewsOpen:(state)=>{
      for (let i = 0; i < state.data.listOpenDelete.length; i++) {
        const option = state.data.listOpenDelete[i];
        option.isOpen = false;
      }
      state.data.openOptions = false;
      state.data.openWorksAreas = false;
      state.data.openDeleteWorkArea = false;
      state.data.openSearchNavBar =false;
      state.data.openMenuUser=false;
    },
    setOpenMenuUser:(state)=>{
      for (let i = 0; i < state.data.listOpenDelete.length; i++) {
        const option = state.data.listOpenDelete[i];
        option.isOpen = false;
      }
      state.data.openOptions = false;
      state.data.openWorksAreas = false;
      state.data.openDeleteWorkArea = false;
      state.data.openSearchNavBar =false;
      state.data.openMenuUser =!state.data.openMenuUser;
    },
    setOpenSearchNavBar:(state)=>{
      for (let i = 0; i < state.data.listOpenDelete.length; i++) {
        const option = state.data.listOpenDelete[i];
        option.isOpen = false;
      }
      state.data.openOptions = false;
      state.data.openWorksAreas = false;
      state.data.openDeleteWorkArea = false;
      state.data.openMenuUser =false;
      state.data.openSearchNavBar =!state.data.openSearchNavBar;
    },
    setListOpenDelete: (state, action) => {
      const list = [];
      for (let index = 0; index < action.payload.length; index++) {
        list.push({ isOpen: false, index });
      }
      state.data.listOpenDelete=list;
    },
    addOpenDelete:(state,action)=>{
      state.data.listOpenDelete.push(action.payload);
    },
    removeOpenDelete:(state,action)=>{
      state.data.listOpenDelete=state.data.listOpenDelete.filter((openDelete,index)=>index !==action.payload);
    },
    handlerListOpenDelete: (state, action) => {
      const index = action.payload;
      if (state.data.listOpenDelete[index].isOpen === true) {
        state.data.listOpenDelete[index].isOpen = false;
      } else {
        for (let i = 0; i < state.data.listOpenDelete.length; i++) {
          const option = state.data.listOpenDelete[i];
          option.isOpen = false;
        }
        if (state.data.listOpenDelete[index]) {
          state.data.listOpenDelete[index].isOpen = true;
        }
      }
      state.data.openOptions = false;
      state.data.openWorksAreas = false;
      state.data.openSearchNavBar =false;
      state.data.openMenuUser =false;
    },
    setOpenDeleteWorkArea: (state) => {
      for (let i = 0; i < state.data.listOpenDelete.length; i++) {
        const option = state.data.listOpenDelete[i];
        option.isOpen = false;
      }
      state.data.openOptions = false;
      state.data.openWorksAreas = false;
      state.data.openSearchNavBar =false;
      state.data.openMenuUser =false;
      state.data.openDeleteWorkArea = !state.data.openDeleteWorkArea;
    },
    setOptions: (state) => {
      for (let i = 0; i < state.data.listOpenDelete.length; i++) {
        const option = state.data.listOpenDelete[i];
        option.isOpen = false;
      }
      state.data.openWorksAreas = false;
      state.data.openSearchNavBar =false;
      state.data.openMenuUser =false;
      state.data.openOptions = !state.data.openOptions;

    },
    setOpenWorksAreas: (state) => {
      for (let i = 0; i < state.data.listOpenDelete.length; i++) {
        const option = state.data.listOpenDelete[i];
        option.isOpen = false;
      }
      state.data.openSearchNavBar =false;
      state.data.openOptions = false;
      state.data.openMenuUser =false;
      state.data.openWorksAreas = !state.data.openWorksAreas;
    },

    //FORM FROM WORK AREA
    setOpenModal: (state) => {
      for (let i = 0; i < state.data.listOpenDelete.length; i++) {
        const option = state.data.listOpenDelete[i];
        option.isOpen = false;
      }
      state.data.openWorksAreas = false;
      state.data.openOptions = false;
      state.data.openSearchNavBar =false;
      state.data.openMenuUser =false;
      state.data.openModal = !state.data.openModal;
    },
    setOpenModalFormBoard: (state) => {
      for (let i = 0; i < state.data.listOpenDelete.length; i++) {
        const option = state.data.listOpenDelete[i];
        option.isOpen = false;
      }
      state.data.openWorksAreas = false;
      state.data.openOptions = false;
      state.data.openModal = false;
      state.data.openMenuUser =false;
      state.data.openModalFormBoard=!state.data.openModalFormBoard;
    },
  },
});

export const {
  setOptions,
  setOpenWorksAreas,
  setOpenModal,
  setOpenDeleteWorkArea,
  setListOpenDelete,
  handlerListOpenDelete,
  addOpenDelete,
  removeOpenDelete,
  setOpenModalFormBoard,
  setOpenMenuUser,
  setOpenSearchNavBar,
  resetAllViewsOpen
} = wiewActiveSlice.actions;

export default wiewActiveSlice.reducer;
