import React from 'react'

const Options = () => {
    return (
        <section className="background__element__absolute options__create">
            <div className="option">
                <h3 className="option__title"><i className="uil uil-th-large icon__board"></i> Crear tablero</h3>
                <p className="option__description">Un tablero es un espacio organizado en el cual usted
                    pordrá administrar tareas especificas.
                </p>
            </div>
            <div className="option">
                <h3 className="option__title"><i class="uil uil-focus icon__area"></i> Crear area de trabajo</h3>
                <p className="option__description">Un area de trabajo es un espacio organizado en el cual usted
                    pordrá crear tableros y gestionar toda la información de sus tareas.
                </p>
            </div>
        </section>
    )
}

export default Options