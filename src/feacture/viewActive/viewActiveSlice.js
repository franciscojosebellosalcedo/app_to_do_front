import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    listOpenDelete: [],
    openOptions: false,
    openWorksAreas: false,
    openModal: false,
    openModalFormBoard:false,
    openDeleteWorkArea: false,
  },
};

export const wiewActiveSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setListOpenDelete: (state, action) => {
      const list = [];
      action.payload.map((_, index) => {
        list.push({ isOpen: false, index });
      });
      state.data.listOpenDelete=list;
    },
    addOpenDelete:(state,action)=>{
      state.data.listOpenDelete.push(action.payload);
    },
    removeOpenDelete:(state,action)=>{
      state.data.listOpenDelete=state.data.listOpenDelete.filter((openDelete,index)=>index !=action.payload);
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
    },
    setOpenDeleteWorkArea: (state) => {
      state.data.openOptions = false;
      state.data.openWorksAreas = false;
      state.data.openDeleteWorkArea = !state.data.openDeleteWorkArea;
    },
    setOptions: (state) => {
      state.data.openOptions = !state.data.openOptions;
      state.data.openWorksAreas = false;
    },
    setOpenWorksAreas: (state) => {
      state.data.openWorksAreas = !state.data.openWorksAreas;
      state.data.openOptions = false;
    },

    //FORM FROM WORK AREA
    setOpenModal: (state) => {
      state.data.openWorksAreas = false;
      state.data.openOptions = false;
      state.data.openModal = !state.data.openModal;
    },
    setOpenModalFormBoard: (state) => {
      state.data.openWorksAreas = false;
      state.data.openOptions = false;
      state.data.openModal = false;
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
  setOpenModalFormBoard
} = wiewActiveSlice.actions;

export default wiewActiveSlice.reducer;
