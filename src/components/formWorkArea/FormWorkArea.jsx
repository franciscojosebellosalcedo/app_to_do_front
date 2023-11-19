import React from 'react'
import "./FormWorkArea.css"
import { useState } from 'react'
import { OPTIONS_SELECT } from '../../constanst/constants';
import { useDispatch, useSelector } from "react-redux";
import { setOpenModal,addOpenDelete } from "../../feacture/viewActive/viewActiveSlice";
import { addNewWorkArea } from "../../feacture/workArea/workAreaSlice";
import { createNewWorkArea } from "../../services/workArea";
import { Toaster, toast } from 'sonner';

const FormWorkArea = () => {
    const openModal = useSelector((state) => state.viewActive.data.openModal);
    const user = useSelector((state) => state.user.data.user);
    const accessToken = useSelector((state) => state.user.data.accessToken);
    const dispatch = useDispatch();
    const [openOptionSelect, setOpenSelect] = useState(false);
    const [newWorkArea, setNewWorkArea] = useState({ name: "", description: "", type: "", user: user?._id });

    const handlerOpenModal = () => {
        dispatch(setOpenModal());
    }

    const handlerFormWorArea = (target, value) => {
        if (target === "type") {
            if (OPTIONS_SELECT.includes(value)) {
                if (value === OPTIONS_SELECT[0]) {
                    setNewWorkArea({ ...newWorkArea, [target]: "" });
                } else {
                    setNewWorkArea({ ...newWorkArea, [target]: value });
                }
                handlerOpenOptionsSelect();
            }
        } else {
            setNewWorkArea({ ...newWorkArea, [target]: value });
        }

    }

    const handlerOpenOptionsSelect = () => {
        setOpenSelect(!openOptionSelect);
    }

    const createWorkArea = async (e) => {
        e.preventDefault();
        try {
            if (newWorkArea.type != "" && newWorkArea.name != "") {
                if(accessToken){
                    const responseCreate=await createNewWorkArea(accessToken,newWorkArea);
                    if(responseCreate.status===200 && responseCreate.response){
                        dispatch(addNewWorkArea(responseCreate.data));
                        handlerOpenModal();
                        toast.success(responseCreate.message);
                        setNewWorkArea({ name: "", description: "", type: "", user: user?._id });
                        dispatch(addOpenDelete({isOpen:false}));
                    }else{
                        toast.error(responseCreate.message);
                    }
                }
            }
        } catch (error) {
            toast.error("Error al crear el area de trabajo")
        }
    }

    return (
        <>
        <Toaster richColors position='top-center'/>
            {
                openModal && <div className='container__modal'>
                    <section className='modal'>
                        <i className="uil uil-multiply icon__close" onClick={() => handlerOpenModal()}></i>
                        <h1 className='modal__title'>Vamos a crear un area de trabajo</h1>
                        <p className='modal__description'>
                            Hacemos que sea más productivo administrando tus propias areas de trabajo.
                        </p>
                        <form className='form__wor__area'>
                            <section className='form__section'>
                                <label htmlFor="input__name">Nombre del area de trabajo</label>
                                <input value={newWorkArea.name} onInput={(e) => handlerFormWorArea("name", e.target.value)} id='input__name' type="text" placeholder='Mi AT' />
                                <p>Este es el nombre de su empresa, equipo u organización.</p>
                            </section>
                            <section className='form__section'>
                                <label htmlFor="input__select">Tipo de area de trabajo</label>
                                <div id='input__select' className='input__select'>
                                    <div onClick={() => handlerOpenOptionsSelect()}>
                                        {newWorkArea.type != "" && newWorkArea.type != OPTIONS_SELECT[0] ? newWorkArea.type : "Elige..."} <i className="uil uil-angle-down icon__dropdown"></i>
                                    </div>
                                    {
                                        openOptionSelect &&
                                        <section className='background__element__absolute options__select'>
                                            {
                                                OPTIONS_SELECT.map((option, index) => <div onClick={(e) => handlerFormWorArea("type", e.target.textContent)} key={index} className='option__select'>{option}</div>)
                                            }
                                        </section>
                                    }
                                </div>
                            </section>

                            <section className='form__section'>
                                <label htmlFor="input__description">Descripción del area de trabajo (Opcional) </label>
                                <textarea value={newWorkArea.description} onInput={(e) => handlerFormWorArea("description", e.target.value)} name="" id="input__description" cols="30" rows="10"></textarea>
                            </section>

                            <button className={`btn__create__work__area ${newWorkArea.name === "" || newWorkArea.type === "" ? ' disable__cursor' : ""}`} onClick={(e) => createWorkArea(e)}>Guardar</button>
                        </form>
                    </section>
                </div>
            }
        </>
    )
}

export default FormWorkArea