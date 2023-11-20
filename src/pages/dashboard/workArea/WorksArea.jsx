import "./WorksArea.css"
import NavBar from '../../../components/navBar/NavBar';
import { useDispatch,useSelector } from "react-redux";
import { setOpenModal } from "../../../feacture/viewActive/viewActiveSlice";
import WorkAreaList from '../../../components/workAreaList/WorkAreaList';
import BoardsFovorite from '../../../components/boardsFavorite/BoardsFovorite';

const WorksArea = () => {
  const allBoardsFavorite=useSelector((state)=>state.board.data.favorites);
  const dispatch=useDispatch();

  const handLerOpenModal = () => {
    dispatch(setOpenModal());
  }

  return (
    <div className=''>
      <NavBar />
      <div className='conatiner__content'>
        <BoardsFovorite boardsFavorites={allBoardsFavorite}/>
        <h1 className='work__area__title'>
          <i className="uil uil-focus icon__area__main"></i> Tus areas de trabajo
        </h1>
        <p className='descripcion__work__area'>Estos son tus areas de trabajo creados, si aún no tienes areas de trabajo creemos el primero 😊</p>
        <button type='button' className='create__work__area' onClick={() => handLerOpenModal()}>
          <i className="uil uil-plus icon__add"></i> Crear area de trabajo
        </button>
        <WorkAreaList />
      </div>
    </div>
  )
}

export default WorksArea;