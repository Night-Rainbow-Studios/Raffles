import React from 'react'

export default function OrdersRender(props) {


  return (
    <div className='max-width-full p-3 m-2'>
        {props.orders.map((item) => (
            <div key ={item.id} className='flex justify-around border-2 border-slate-700 bg-slate-200'>
                <p className='p-3 border-r-2 border-black'>ID</p>
                <p className='p-3 border-r-2 border-black'>{item.id}</p>
                <p className='p-3 border-r-2 border-black'>Pagado?</p>
                <p className={`p-3 ${item.payed === true ? "bg-lime-200":"bg-red-300"}`}>{item.payed === true ? 'Sí' : 'No'}</p>
                <p className='p-3 border-r-2 border-black'>Precio:</p>
                <div>
                    <h3>Tickets:</h3>
                    <ul>
                    {item.tickets.map((ticket) => (
                        <li key={ticket}>{ticket}</li>
                    ))}
                    </ul>
                </div>
                <p className='p-3 border-r-2 border-black'>Fecha y Hora: </p>
                <p className='p-3 border-r-2 border-black'>
                    {new Date(item.time * 1000).toLocaleString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    timeZone: 'America/Mexico_City'
                    })}
                </p>
            </div>
        ))}
    </div>
  )
}
