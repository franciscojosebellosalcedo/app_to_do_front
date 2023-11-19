import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { handlerListOpenDelete, setOpenModalFormBoard } from "../../feacture/viewActive/viewActiveSlice";
import DeleteWorkArea from './DeleteWorkArea';
import {  useNavigate} from "react-router-dom";
import { ROUTES } from '../../constanst/constants';




const ItemWorkArea = ({ workArea, index }) => {
    const listOpenDelete = useSelector((state) => state.viewActive.data.listOpenDelete);
    const navigate=useNavigate();

    const dispatch = useDispatch();

    return (
        <>
            {
                <div className='item__content'>
                    <div className='item__content__work'>
                        <div className='item__first__letter__name__work__area'>
                            {workArea?.name[0].toUpperCase()}
                        </div>
                        <span className='item__name__work__area'>{workArea?.name}</span>
                    </div>

                    <article className='item__options__work__area'>
                        <div className='item__option' onClick={()=>navigate(ROUTES.WORK_AREA_DETAIL+`/${workArea?._id}`)}>
                            <i className="uil uil-th-large icon__board icon__option"></i> Tableros ({workArea?.boards?.length})
                        </div>
                        <div className='item__option'>
                            <i className="uil uil-users-alt icon__members icon__option"></i> Miembros ({workArea?.members?.length})
                        </div>
                        <div className='item__option item__option__delete'>
                            <div onClick={() => dispatch(handlerListOpenDelete(index))}>
                                <i className="uil uil-trash-alt icon__delete icon__option"></i> Eliminar
                            </div>

                            {
                                listOpenDelete && listOpenDelete[index]?.isOpen === true ?
                                    <DeleteWorkArea workArea={workArea} index={index}/>
                                    : ""
                            }

                        </div>
                    </article>
                    <article className='container__boards'>
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
                    </article>
                </div>
            }
        </>
    )
}

export default ItemWorkArea;