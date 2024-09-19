import React from 'react'

export default function AdminDashboard() {
    return (
        <section>
            <div className='flex'>
                <h1>Inicio</h1>
                <h1>Editar</h1>
            </div>
            <div>
                <h1>Editar titulo</h1>
            </div>
            <div>
                <h1>Editar contenido: Hasta 4 renglones</h1>
            </div>
            <div>
                <h1>Generar Base de datos de boletos</h1>
                <h1>Elegir cantidad</h1>
                <button>Generar</button>
            </div>
            <div>
                <button>Eliminar base de datos de boletos</button>
            </div>
            <div>
                <h1>Confirmar orden</h1>
            </div>
            <div>
                <h1>Cancelar orden</h1>
            </div>
            <div>
                Consultar base de datos
            </div>
        </section>
    )
}
