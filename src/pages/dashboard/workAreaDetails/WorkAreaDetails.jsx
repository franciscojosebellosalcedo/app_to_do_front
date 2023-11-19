import React from 'react'
import { useSelector,useDispatch } from "react-redux";
import "./WorkAreaDetails.css"
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import NavBar from '../../../components/navBar/NavBar';
import { ROUTES } from '../../../constanst/constants';
import { setOpenModalFormBoard } from "../../../feacture/viewActive/viewActiveSlice";
import { getWorkArea } from '../../../services/workArea';
import { useState } from 'react';
import Loader from '../../../components/loader/Loader';

const WorkAreaDetails = () => {
  const params = useParams();
  const accessToken = useSelector((state) => state.user.data.accessToken);
  const idUser = useSelector((state) => state.user.data.user._id);
  const navigate = useNavigate();
  const [workArea, setWorkArea] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const dispatch=useDispatch();

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
                    <article className='content__main__work__area'>
                    <button className='btn__invitar__members'><i className="uil uil-user-plus icon__add__member"></i> Invitar nuevo miembro</button>
                      <div className='content__info__work__area'>
                        <div >
                          <div className='letter__work__area'>
                            {workArea?.name[0].toUpperCase()}
                          </div>
                          <section className='info__work__area'>
                            <h1 className='name__work__area'>{workArea?.name}</h1>
                            <i className="uil uil-pen icon__edit__work__area"></i>
                          </section>
                        </div>
                      </div>
                      {
                        workArea.description &&
                        <p className='description__work__area'>{workArea.description}</p>
                      }
                      <figure className='dividor'></figure>
                    </article>

                    <article className='content__boards'>
                      <h1 className='title__content__boards'>Tableros</h1>
                      <div className='grid__boards'>
                        <button onClick={()=>dispatch(setOpenModalFormBoard())} className='item__board item__create__board'>Crear un tablero nuevo</button>
                        {
                          workArea?.boards && workArea?.boards?.length > 0 ?
                            <>
                              {
                                workArea?.boards.map((board, index) => (
                                  <div key={index} className='item__board' style={{ backgroundColor: `${board?.colorBackground}` }}>{board?.title}</div>
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