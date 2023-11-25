import { addBoardFavorite, removeBoardFavorite, setBoardsFavorites ,setListBoards} from "../feacture/board/boardSlice";
import { setListOpenDelete } from "../feacture/viewActive/viewActiveSlice";
import { changeStatusIsFavoriteBoard, setWorkAreas } from "../feacture/workArea/workAreaSlice";
import { editBoard } from "../services/board";
import { getAllWorkAreasByIdUser } from "../services/workArea";
import { toast } from "sonner";

export const searchData=(value,list)=>{
  return list.filter((data)=>data.title.toLowerCase().trim().includes(value.toLowerCase().trim()));
}

export const verificateAuth = () => {
  const data = localStorage.getItem("token");
  return data !== null || data !== undefined;
};

export const headersWithAccessToken = (headers, accessToken) => {
  headers["access-token"] = `bearer ${accessToken}`;
  return headers;
};

export const getAllBoardsFavorites = (list) => {
  const boards = [];
  for (let index = 0; index < list.length; index++) {
    const workArea = list[index];
    boards.push(...workArea.boards);
  }
  return boards.filter((board) => board.isFavorite === true);
};

export const getAllBoards = (list) => {
  const boards = [];
  for (let index = 0; index < list.length; index++) {
    const workArea = list[index];
    boards.push(...workArea.boards);
  }
  return boards;
};

export const getAllWorkAreas = async ({ accessToken, idUser, dispatch }) => {
  try {
    if (accessToken && idUser) {
      const responseData = await getAllWorkAreasByIdUser(accessToken, idUser);
      if (responseData.status === 200 && responseData.response) {
        const data = responseData.data;
        dispatch(setWorkAreas(data));
        const list = [];
        for (let index = 0; index < data.length; index++) {
          list.push({ isOpen: false });
        }
        dispatch(setListOpenDelete(list));
        dispatch(setListBoards(getAllBoards(data)));
        dispatch(setBoardsFavorites(getAllBoardsFavorites(data)));
      }
    }
  } catch (error) {
    toast.error("Error al obtener tus areas de trabajo");
  }
};

export const changeStateIsFavoriteBoard = async ({e,board,accessToken,dispatch}) => {
  e.preventDefault();
  e.stopPropagation();
  try {
      if (accessToken) {
          const responseEdit = await editBoard(accessToken, board.workArea._id, board._id, { isFavorite: !board.isFavorite });
          if (responseEdit.status === 200 && responseEdit.response) {
              const data = responseEdit.data;
              if (data.isFavorite) {
                  dispatch(addBoardFavorite(data));
              } else {
                  dispatch(removeBoardFavorite(data._id));
              }
              dispatch(changeStatusIsFavoriteBoard({ idWorkArea: data.workArea._id, idBoard: data._id, newStatus: data.isFavorite }));
              return {
                idBoard:data._id,
                status:data.isFavorite
              }
          }
      }
  } catch (error) {
      toast.error("Error en marcar como favorito")
  }
}