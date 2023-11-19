import React from 'react'
import "./WorkAreaList.css"
import { useSelector } from 'react-redux';
import Loader from "../../components/loader/Loader";
import ItemWorkArea from './ItemWorkArea';

const WorkAreaList = () => {
    const worksAreas = useSelector((state) => state.workArea.data);
    return (
        <div className='container__list__work__area'>
            <section className='item__container'>
                {
                    !worksAreas ? <Loader/> : worksAreas.length > 0 ?
                        <>
                            {
                                worksAreas.map((workArea, index) => (
                                    <ItemWorkArea key={index} workArea={workArea} index={index}/>
                                ))
                            }
                        </>
                        : ""
                }
            </section>
        </div>
    )
}

export default WorkAreaList;