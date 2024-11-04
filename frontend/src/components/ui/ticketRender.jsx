import React from 'react'

export default function TicketRender(props) {


  return (
    <div className='max-width-full p-3 m-2'>
        {props.tickets.map((item) => (
            <div key ={item.id} className='flex justify-around border-2 border-slate-700 bg-slate-200'>
                <p className='p-3 border-r-2 border-black'>ID</p>
                <p className='p-3 border-r-2 border-black'>{item.id}</p>
                <p className='p-3 border-r-2 border-black'>Libre</p>
                <p className={`p-3 ${item.isFree === true ? "bg-lime-200":"bg-red-300"}`}>{item.isFree === true ? 'Sí' : 'No'}</p>
            </div>
        ))}
    </div>
  )
}
