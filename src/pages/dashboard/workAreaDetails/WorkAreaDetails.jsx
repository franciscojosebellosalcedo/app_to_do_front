import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import "./WorkAreaDetails.css"
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import NavBar from '../../../components/navBar/NavBar';
import { ROUTES } from '../../../constanst/constants';
import { setOpenModalFormBoard } from "../../../feacture/viewActive/viewActiveSlice";
import { addNewChangesWorkArea } from "../../../feacture/workArea/workAreaSlice";
import { getWorkArea, editWorkArea } from '../../../services/workArea';
import { useState } from 'react';
import { toast } from "sonner";
import Loader from '../../../components/loader/Loader';
import { changeStateIsFavoriteBoard } from '../../../helpers/helpers';

const WorkAreaDetails = () => {
  const params = useParams();
  const accessToken = useSelector((state) => state.user.data.accessToken);
  const idUser = useSelector((state) => state.user.data.user._id);
  const navigate = useNavigate();
  const [workArea, setWorkArea] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const dispatch = useDispatch();
  const [editEnable, setEditEnable] = useState(false);
  const [newDataWorkArea, setNewDataWorkArea] = useState({ _id: "", name: "", description: "" });

  const updateWorkArea = async (e) => {
    e.preventDefault();
    try {
      if (accessToken) {
        const responseEdit = await editWorkArea(accessToken, newDataWorkArea);
        if (responseEdit.status === 200 && responseEdit.response) {
          const data = responseEdit.data;
          setWorkArea({ ...workArea, name: data.name, description: data.description });
          dispatch(addNewChangesWorkArea(newDataWorkArea));
          handlerEdit();
          toast.success(responseEdit.message);
        } else {
          toast.error(responseEdit.message);
        }
      }
    } catch (error) {
      toast.error("Error al editar esta area de trabajo");
    }
  }

  const handlerEdit = () => {
    setEditEnable(!editEnable);
    setNewDataWorkArea({ _id: workArea?._id, name: workArea?.name, description: workArea?.description });
  }

  const getOneWorkArea = async () => {
    setIsLoader(true);
    try {
      if (accessToken) {
        const responseGetWorkArea = await getWorkArea(accessToken, params.id, idUser);
        if (responseGetWorkArea.status === 200 && responseGetWorkArea.response) {
          const data = responseGetWorkArea.data;
          setWorkArea(data);
        } else {
          navigate(ROUTES.WORKS_AREAS);
        }
      }
    } catch (error) {
      navigate(ROUTES.WORKS_AREAS);
    }
    setIsLoader(false);
  }

  const redirectBoard = (workArea, board) => {
    navigate(ROUTES.WORK_AREA_BOARD + `/${workArea?._id}/board/${board?._id}`);
  }

  const handlerFormEditWorkArea = (target, value) => {
    setNewDataWorkArea({ ...newDataWorkArea, [target]: value });
  }

  const cancelEditWorkArea = (e) => {
    e.preventDefault();
    handlerEdit();
  }

  const handlerIsfavorite=async (e,board,accessToken,dispatch)=>{
    const response=await changeStateIsFavoriteBoard({e,board,accessToken,dispatch});
    const dataWorkArea=workArea;
    const indexBoard=dataWorkArea.boards.findIndex((b)=>b._id===response.idBoard);
    dataWorkArea.boards[indexBoard].isFavorite=response.status;
    setWorkArea({...dataWorkArea})
  }

  useEffect(() => {
    if (params.id) {
      getOneWorkArea();
    }
  }, [])

  return (
    <div>
      <>
        {
          isLoader === true
            ?
            <Loader />
            :
            <>
              <NavBar />
              <section className='container__section__work__area__details'>
                <i className="uil uil-arrow-left icon__back__section" onClick={() => navigate(ROUTES.WORKS_AREAS)}></i>
                {
                  workArea &&
                  <div className='container__content__work__area'>
                    <button className='btn__invitar__members'><i className="uil uil-user-plus icon__add__member"></i> Invitar nuevo miembro</button>
                    <article className='content__main__work__area'>
                      {
                        editEnable === true
                          ?
                          <div className='conatiner__edit__work__area'>

                            <form className='form__edit__work__area'>
                              <div className='form__section__edit'>
                                <label htmlFor="input__edit__name">Nombre</label>
                                <input onInput={(e) => handlerFormEditWorkArea("name", e.target.value)} id='input__edit__name' className='input__edit__work__area input__edit' type="text" value={newDataWorkArea.name} />
                              </div>
                              <div className='form__section__edit'>
                                <label htmlFor="input__edit__description">Descripción</label>
                                <textarea onInput={(e) => handlerFormEditWorkArea("description", e.target.value)} value={newDataWorkArea.description} id="input__edit__description " className='input__edit__description' ></textarea>
                              </div>
                              <div className='btns__form__edit__work__area'>
                                <button className='btn__form__edit__work__area btn__cancel' onClick={(e) => cancelEditWorkArea(e)}>Cancelar</button>
                                <button onClick={(e) => updateWorkArea(e)} className={`btn__form__edit__work__area btn__save ${newDataWorkArea.name === "" ? "disable__cursor" : ""}`}  >Guardar</button>
                              </div>
                            </form>

                          </div>
                          :
                          <>
                            <div className='content__info__work__area'>
                              <div >
                                <div className='letter__work__area'>
                                  {workArea?.name[0].toUpperCase()}
                                </div>
                                <section className='info__work__area'>
                                  <h1 className='name__work__area'>{workArea?.name}</h1>
                                  <i className="uil uil-pen icon__edit__work__area" onClick={() => handlerEdit()}></i>

                                </section>
                              </div>
                            </div>
                            {
                              workArea.description &&
                              <p className='description__work__area'>{workArea.description}</p>
                            }
                          </>
                      }

                      <figure className='dividor'></figure>
                    </article>

                    <article className='content__boards'>
                      <h1 className='title__content__boards'>Tableros</h1>
                      <div className='grid__boards'>
                        <button onClick={() => dispatch(setOpenModalFormBoard())} className='item__board item__create__board'>Crear un tablero nuevo</button>
                        {
                          workArea?.boards && workArea?.boards?.length > 0 ?
                            <>
                              {
                                workArea?.boards.map((board, index) => (
                                  <div onClick={() => redirectBoard(workArea, board)} key={index} className='item__board' style={{ backgroundColor: `${board?.colorBackground}` }}>
                                    {board?.title}
                                    <i className="uil uil-star icon__favorite" style={{color:board.isFavorite && "yellow"}} onClick={(e) => handlerIsfavorite(e,board,accessToken,dispatch)}></i>
                                  </div>
                                ))
                              }
                            </> : ""
                        }
                      </div>
                    </article>
                  </div>
                }
              </section>
            </>
        }
      </>
    </div>
  )
}

export default WorkAreaDetails;