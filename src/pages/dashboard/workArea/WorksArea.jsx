import React, { useEffect } from 'react'
import "./WorksArea.css"
import NavBar from '../../../components/navBar/NavBar';
import { useDispatch, useSelector } from "react-redux";
import { setOpenModal, setListOpenDelete } from "../../../feacture/viewActive/viewActiveSlice";
import { setWorkAreas } from "../../../feacture/workArea/workAreaSlice";
import { getAllWorkAreasByIdUser } from '../../../services/workArea';
import WorkAreaList from '../../../components/workAreaList/WorkAreaList';
import Loader from '../../../components/loader/Loader';
import { useState } from 'react';
import { toast } from 'sonner';

const WorksArea = () => {
  const accessToken = useSelector((state) => state.user.data.accessToken);
  const idUser = useSelector((state) => state.user.data.user._id);
  const [isLoader, setIsloader] = useState(false);
  const dispatch = useDispatch();

  const handLerOpenModal = () => {
    dispatch(setOpenModal());
  }

  const getAllWorkAreas = async () => {
    setIsloader(true);
    try {
      if (accessToken && idUser) {
        const responseData = await getAllWorkAreasByIdUser(accessToken, idUser);
        if (responseData.status === 200 && responseData.response) {
          dispatch(setWorkAreas(responseData.data));
          const list = [];
          responseData.data.map((_,) => {
            list.push({ isOpen: false });
          });
          dispatch(setListOpenDelete(list))
        }
      }
    } catch (error) {
      toast.error("Error al obtener tus areas de trabajo")
    }
    setIsloader(false);
  }

  useEffect(() => {
    getAllWorkAreas();
  }, [])

  return (
    <div className=''>
      {
        isLoader === true ? <Loader/>:
          <>
            <NavBar />
            <div className='conatiner__content'>
              <h1 className='work__area__title'>
                Tus areas de trabajo
              </h1>
              <p className='descripcion__work__area'>Estos son tus areas de trabajo creados, si aún no tienes areas de trabajo creemos el primero 😊</p>
              <button type='button' className='create__work__area' onClick={() => handLerOpenModal()}>
                <i className="uil uil-plus icon__add"></i> Crear area de trabajo
              </button>
              <WorkAreaList />
            </div>
          </>
      }
    </div>
  )
}

export default WorksArea;