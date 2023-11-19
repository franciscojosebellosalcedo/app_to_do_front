import React from 'react'
import { useDispatch } from "react-redux";
import {  setOptions,setOpenModal,setOpenModalFormBoard} from "../../feacture/viewActive/viewActiveSlice";

const Options = () => {
    const dispatch=useDispatch();

    const handlerOpenModalForm=()=>{
        dispatch(setOptions());
        dispatch(setOpenModal());
    }

    const handlerOpenModalFormBoard=()=>{
        dispatch(setOptions());
        dispatch(setOpenModalFormBoard());
    }

    return (
       <>
         <section className="background__element__absolute options__create">
            <i className="uil uil-multiply icon__close__list__work__areas" onClick={()=>dispatch(setOptions())}></i>
            <div className="option" onClick={()=>handlerOpenModalFormBoard()} >
                <h3 className="option__title"><i className="uil uil-th-large icon__board"></i> Crear tablero</h3>
                <p className="option__description">Un tablero es un espacio organizado en el cual usted
                    pordrá administrar tareas especificas.
                </p>
            </div>
            <div className="option" onClick={()=>handlerOpenModalForm()}>
                <h3 className="option__title"><i className="uil uil-focus icon__area"></i> Crear area de trabajo</h3>
                <p className="option__description">Un area de trabajo es un espacio organizado en el cual usted
                    pordrá crear tableros y gestionar toda la información de sus tareas.
                </p>
            </div>
        </section>
       </>
    )
}

export default Options;