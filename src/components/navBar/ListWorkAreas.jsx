import React from 'react'
import { useSelector,useDispatch } from "react-redux";
import {setOpenWorksAreas  } from "../../feacture/viewActive/viewActiveSlice";
import { ROUTES } from '../../constanst/constants';

const ListWorkAreas = () => {
    const workAreas = useSelector((state) => state.workArea.data);
    const dispatch=useDispatch();

    return (
        <section className="background__element__absolute list__work__areas">
            <i className="uil uil-multiply icon__close__list__work__areas" onClick={()=>dispatch(setOpenWorksAreas())}></i>
            <h3 className="list__work__area__title">Tus areas de trabajo</h3>
            <div className='list'>
                {
                    workAreas && workAreas.length > 0 ?
                        <>
                            {
                                workAreas.map((workArea,index) => (
                                    <a href={ROUTES.WORK_AREA_DETAIL+`/${workArea._id}`} key={index} className='item__list' >
                                        <div>{workArea?.name[0]}</div> <h3>{workArea?.name}</h3>
                                    </a>
                                ))
                            }
                        </>
                        : ""
                }
            </div>
        </section>
    )
}

export default ListWorkAreas;