import React from 'react'

const ListWorkAreas = () => {
    return (
        <section className="background__element__absolute list__work__areas">
            <h3 className="list__work__area__title">Tus areas de trabajo</h3>
            <div className='list'>
                <article className='item__list'>
                    <div>P</div> <h3>Primer area de trabajo</h3>
                </article>
                <article className='item__list'>
                    <div>S</div> <h3>Segunda area de trabajo</h3>
                </article>
                <article className='item__list'>
                    <div>T</div> <h3>Tercera area de trabajo</h3>
                </article>
            </div>
        </section>
    )
}

export default ListWorkAreas;